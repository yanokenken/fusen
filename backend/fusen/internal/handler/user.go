package handler

import (
	"fusen/db"
	"fusen/internal/models"
	"log"

	"fusen/internal/auth"

	"github.com/labstack/echo/v4"
)

func GetUser(c echo.Context) error {
	log.Println("ユーザー情報取得 開始")
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

	targetUser, err := models.Users(
			models.UserWhere.ID.EQ(userID),
			models.UserWhere.DeletedAt.IsNull(),
	).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	targetUser.Password = ""

	return c.JSON(200, targetUser)
}

func DeteteUser(c echo.Context) error {
	log.Println("ユーザー削除 開始")
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

	// deleted_atを更新
	_, err = models.Users(models.UserWhere.ID.EQ(userID)).UpdateAll(c.Request().Context(), db, models.M{
		"deleted_at": "now()",
	})
	if err != nil {
		return err
	}	

	return c.JSON(200, "ユーザー削除完了")
}




