package handler

import (
	"database/sql"
	"fusen/db"
	"fusen/internal/models"
	"log"
	"time"

	"fusen/internal/auth"

	"github.com/labstack/echo/v4"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

func GetPreference(c echo.Context) error {
	log.Println("設定情報取得 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	//jwtからユーザーIDを取得
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}

	preference, err := models.Preferences(models.PreferenceWhere.UserID.EQ(userID)).One(c.Request().Context(), db)
	if err != nil && err != sql.ErrNoRows {
			log.Println("データベースエラー:", err)
			return err
	}
	
	// preferenceがない場合は新規作成
	if err == sql.ErrNoRows {
			preference = &models.Preference{
					UserID: userID,
					Theme: "light",
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
			}
			err = preference.Insert(c.Request().Context(), db, boil.Infer())
			if err != nil {
					log.Println("新規登録エラー:", err)
					return err
			}
	}
	
	return c.JSON(200, preference)}

func UpdatePreference(c echo.Context) error {
	log.Println("設定情報更新 開始")
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	//jwtからユーザーIDを取得
	userID, err := auth.GetUserID(c)
	if err != nil {
		return err
	}

	preference, err := models.Preferences(models.PreferenceWhere.UserID.EQ(userID)).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	if err := c.Bind(preference); err != nil {
		return err
	}

	preference.UpdatedAt = time.Now()
	preference.Update(c.Request().Context(), db, boil.Infer())

	return c.JSON(200, preference)
}