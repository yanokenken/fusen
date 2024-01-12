package handler

import (
	"encoding/json"
	"fusen/db"
	"fusen/internal/auth"
	"fusen/internal/models"
	"log"
	"strconv"
	"time"

	"github.com/ericlagergren/decimal"
	"github.com/labstack/echo/v4"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
	"github.com/volatiletech/sqlboiler/v4/types"
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
	SortNo      types.Decimal `json:"sort_no"`
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
	fusens, err := models.Fusens(
		models.FusenWhere.UserID.EQ(userID),
		qm.OrderBy("sort_no ASC"),
	).All(c.Request().Context(), db)
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
					CreatedAt:   fusen.CreatedAt,
					UpdatedAt:   fusen.UpdatedAt,
					SortNo:			 fusen.SortNo,					
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

	// fusensのsort_no最大値を取得
	maxSortRecord, err := models.Fusens(
		models.FusenWhere.UserID.EQ(userID),
		qm.OrderBy("sort_no DESC"),
	).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	// sort_noを作成
	if maxSortRecord == nil {
		customFusen.SortNo = types.NewDecimal(decimal.New(1, 0))
	} else {
		maxSortNo :=	maxSortRecord.SortNo
		decimalOne := types.NewDecimal(decimal.New(1, 0))
		newSortNo := types.NewDecimal(maxSortNo.Add(maxSortNo.Big, decimalOne.Big))
		customFusen.SortNo = newSortNo
	}

	fusen := models.Fusen{
		UserID:      int(userID),
		BoardID:     customFusen.BoardID,
		Title:       customFusen.Title,
		Memo:        null.StringFrom(customFusen.Memo),
		IsUrgent:    customFusen.IsUrgent,
		IsImportant: customFusen.IsImportant,
		Status:      int(customFusen.Status),
		CreatedAt:   now,
		UpdatedAt:   now,
		SortNo:			 customFusen.SortNo,
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

// 付箋のソート番号変更
func UpdateFusenSortNo (c echo.Context) error {

	type reqBody struct {
		ActiveId int `json:"activeId"` // 移動中の付箋
		OverId int `json:"overId"`		 // 移動先の付箋
	}

	log.Println("付箋ソート 開始")
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

	req := new(reqBody)
	if err := c.Bind(&req); err != nil {
		return err
	}
	// sort_noを作成（prevIdのsort_no+nextIdのsort_no /2）

	log.Println(req)
	// 移動中の付箋番号
	activeFusen, err := models.Fusens(
		models.FusenWhere.ID.EQ(req.ActiveId),
		models.FusenWhere.UserID.EQ(userID),
	).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	// 移動先の付箋番号
	overFusen, err := models.Fusens(
		models.FusenWhere.ID.EQ(req.OverId),
		models.FusenWhere.UserID.EQ(userID),
	).One(c.Request().Context(), db)
	if err != nil {
		return err
	}
	// 移動先の付箋番号より１つ次
	nextFusen, err := models.Fusens(
		models.FusenWhere.SortNo.GT(overFusen.SortNo),
		models.FusenWhere.UserID.EQ(userID),
		qm.OrderBy("sort_no ASC"),
	).One(c.Request().Context(), db)
	if err != nil {
		// 一番最後の付箋の場合
		nextFusen, err = models.Fusens(
			models.FusenWhere.UserID.EQ(userID),
			qm.OrderBy("sort_no DESC"),
		).One(c.Request().Context(), db)
		if err != nil {
			return err
		}
		nextFusen.SortNo = types.Decimal{Big: nextFusen.SortNo.Add(nextFusen.SortNo.Big, decimal.New(1, 0))}
	}
	// 移動先の付箋番号の一つ前
	prevFusen, err := models.Fusens(
		models.FusenWhere.SortNo.LT(overFusen.SortNo),
		models.FusenWhere.UserID.EQ(userID),
		qm.OrderBy("sort_no DESC"),
	).One(c.Request().Context(), db)
	if err != nil {
		// 一番最初の付箋の場合
		prevFusen, err = models.Fusens(
			models.FusenWhere.UserID.EQ(userID),
			qm.OrderBy("sort_no ASC"),
		).One(c.Request().Context(), db)
		if err != nil {
			return err
		}
		prevFusen.SortNo = types.Decimal{Big: prevFusen.SortNo.Add(prevFusen.SortNo.Big, decimal.New(-1, 0))}
	}

	// var prevSortNo types.Decimal = prevFusen.SortNo
	var activeFusenSortNo types.Decimal = activeFusen.SortNo
	var calcTargetSortNo types.Decimal
	log.Println("----------------------------------------0")
	log.Println("active: ", activeFusenSortNo.Big)
	log.Println("over: ", overFusen.SortNo.Big)
	log.Println("next: ", nextFusen.SortNo.Big)
	log.Println("prev: ", prevFusen.SortNo.Big)
	log.Println(activeFusenSortNo.Big.Cmp(overFusen.SortNo.Big))
	// 移動中の付箋が移動先の付箋よりも大きい場合
	if overFusen != nil && activeFusenSortNo.Big.Cmp(overFusen.SortNo.Big) > 0 {
		// 位置が上がる時
		log.Println("--------------------------------------1")
		calcTargetSortNo = prevFusen.SortNo
	} else {
		// 位置が下がる時
		log.Println("--------------------------------------2")
		calcTargetSortNo = nextFusen.SortNo

	}

	decimalTwo := types.NewDecimal(decimal.New(2, 0))
	newSortNo  := overFusen.SortNo.Add(overFusen.SortNo.Big, calcTargetSortNo.Big).Quo(overFusen.SortNo.Big, decimalTwo.Big)
	_, err = models.Fusens(
		models.FusenWhere.ID.EQ(req.ActiveId),
		models.FusenWhere.UserID.EQ(userID),
	).UpdateAll(c.Request().Context(), db, models.M{
		"sort_no": newSortNo.String(),
	})

	if err != nil {
		return err
	}

	// ソート番号最適化
	err = OptimizeFusenSortNo(c)
	if err != nil {
		return err
	}

	return c.JSON(200, "ソートしました")
}

// 付箋のソート番号最適化
func OptimizeFusenSortNo (c echo.Context) error {
	log.Println("付箋ソート最適化 開始")
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
	// fusensテーブルのsort_noをascでソートし、行番号で更新する

	query := `
			UPDATE fusens as f1
			SET sort_no = CAST(f2.row_num AS numeric(13,4))
			FROM (
				SELECT 
					id, 
					row_number() OVER (PARTITION BY user_id ORDER BY sort_no ASC) AS row_num
				FROM fusens
			) AS f2
			WHERE  f1.user_id = $1
			AND f1.id = f2.id
		`
	_, err = db.Exec(query, userID)
	if err != nil {
		return err
	}
	return nil
}
