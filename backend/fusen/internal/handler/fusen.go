package handler

import (
	"encoding/json"
	"fusen/db"
	"fusen/internal/auth"
	"fusen/internal/models"
	"log"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

// 返却用の構造体
type CustomCheckpoint struct {
	ID        string `json:"id"`
	FusenID   int64 `json:"fusen_id"`
	Body      string `json:"body"`
	IsChecked bool `json:"is_checked"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CustomFusen struct {
	ID          int64 `json:"id"`
	UserID      int64 `json:"user_id"`
	BoardID     string `json:"board_id"`
	Title       string `json:"title"`
	Memo        string `json:"memo"`
	IsUrgent    bool `json:"is_urgent"`
	IsImportant bool `json:"is_important"`
	Status      int8 `json:"status"`
	Checkpoints []CustomCheckpoint `json:"checkpoints"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func GetFusens(c echo.Context) error {
	log.Println("付箋情報取得 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	// リクエストユーザー
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}

	// fusensテーブルにcheckpointsとしてfusen_idが一致するcheckpointsテーブルのリストを追加する
	fusens, err := models.Fusens(models.FusenWhere.UserID.EQ(userID)).All(c.Request().Context(), db)
	if err != nil {
		return err
	}
	for _, fusen := range fusens {
		err = fusen.L.LoadCheckpoints(c.Request().Context(), db, true, fusen, nil )
		if err != nil {
			return err
		}
	}

	// 返却用の構造体に詰め替える
	customFusens := make([]CustomFusen, len(fusens))
	for i, fusen := range fusens {

			customFusen := CustomFusen{
					ID:          int64(fusen.ID),
					UserID:      int64(fusen.UserID),
					BoardID:     fusen.BoardID,
					Title:       fusen.Title,
					Memo:        fusen.Memo.String,
					IsUrgent:    fusen.IsUrgent,
					IsImportant: fusen.IsImportant,
					Status:      int8(fusen.Status),
			}
			for _, checkpoint := range fusen.R.Checkpoints {
					customCheckpoint := CustomCheckpoint{
							ID:        checkpoint.ID,
							FusenID:   int64(checkpoint.FusenID),
							Body:      checkpoint.Body,
							IsChecked: checkpoint.IsChecked,
					}
					customFusen.Checkpoints = append(customFusen.Checkpoints, customCheckpoint)
			}
			customFusens[i] = customFusen
	}

	jsonBytes, err := json.Marshal(customFusens)
	if err != nil {
			return err
	}

	return c.JSONBlob(200, jsonBytes)
}

// CreateFusen 付箋作成
func CreateFusen (c echo.Context) error {
	log.Println("付箋作成 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	// リクエストユーザー
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}

	customFusen := new(CustomFusen)
	if err := c.Bind(&customFusen); err != nil {
		return err
	}
	now := time.Now()
	fusen := models.Fusen{
		UserID:      int(userID),
		BoardID:     customFusen.BoardID,
		Title:       customFusen.Title,
		Memo:        null.StringFrom(customFusen.Memo),
		IsUrgent:    customFusen.IsUrgent,
		IsImportant: customFusen.IsImportant,
		Status:      int(customFusen.Status),
		CreatedAt:  now,
		UpdatedAt:  now,
	}

	err = fusen.Insert(c.Request().Context(), db, boil.Infer())
	if err != nil {
		return err
	}


	// 付箋に紐づいているcheckpointsを作成
	for _, checkpoint := range customFusen.Checkpoints {
		checkpoint := models.Checkpoint{
			ID:				 checkpoint.ID,
			FusenID:   int(fusen.ID),
			Body:      checkpoint.Body,
			IsChecked: checkpoint.IsChecked,
			CreatedAt: now,
			UpdatedAt: now,
		}
		err = checkpoint.Insert(c.Request().Context(), db, boil.Infer())
		if err != nil {
			return err
		}
	}

	return c.JSON(200, fusen)
}

// 付箋更新
func UpdateFusen (c echo.Context) error {
	log.Println("付箋更新 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	// リクエストユーザー
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}

	customFusen := new(CustomFusen)
	if err := c.Bind(&customFusen); err != nil {
		return err
	}
	
	// fusen 更新
	if customFusen.ID == 0 {
		return c.JSON(400, "付箋IDが指定されていません")
	}

	customFusen.UpdatedAt = time.Now()
	customFusen.UserID = int64(userID)

	_, err = models.Fusens(
			models.FusenWhere.ID.EQ(int(customFusen.ID)), models.FusenWhere.UserID.EQ(userID)).
			UpdateAll(c.Request().Context(), db, models.M{
					"title":        customFusen.Title,
					"memo":         customFusen.Memo,
					"is_urgent":    customFusen.IsUrgent,
					"is_important": customFusen.IsImportant,
					"status":       customFusen.Status,
					"updated_at":   customFusen.UpdatedAt,
			})

	if err != nil {
		return err
	}

	// checkpoints をdelete insert

	// 付箋に紐づいているcheckpointsを削除
	_, err = models.Checkpoints(models.CheckpointWhere.FusenID.EQ(int(customFusen.ID))).DeleteAll(c.Request().Context(), db)
	if err != nil {
		return err
	}

	// 付箋に紐づいているcheckpointsを作成
	now := time.Now()
	for _, checkpoint := range customFusen.Checkpoints {
		_checkpoint := models.Checkpoint{
			ID:				 checkpoint.ID,
			FusenID:   int(customFusen.ID),
			Body:      checkpoint.Body,
			IsChecked: checkpoint.IsChecked,
			CreatedAt: now,
			UpdatedAt: now,
		}
		err = _checkpoint.Insert(c.Request().Context(), db, boil.Infer())
		if err != nil {
			return err
		}
	}

	return c.JSON(200, customFusen)
}

// 付箋削除
func DeleteFusen (c echo.Context) error {	
	log.Println("付箋削除 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	// urlの:idを取得
	deleteFusenIdInt, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return err
	}
	if deleteFusenIdInt == 0 {
		return c.JSON(400, "付箋IDが指定されていません")
	}


	// リクエストユーザー
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}
	// checkpoints 削除
	_, err = models.Checkpoints(models.CheckpointWhere.FusenID.EQ(deleteFusenIdInt)).DeleteAll(c.Request().Context(), db)
	if err != nil {
		return err
	}
	// fusen 削除
	_, err = models.Fusens(models.FusenWhere.ID.EQ(deleteFusenIdInt), models.FusenWhere.UserID.EQ(userID)).DeleteAll(c.Request().Context(), db)
	if err != nil {
		return err
	}

	return c.JSON(200,"削除しました")
}