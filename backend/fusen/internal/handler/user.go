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

	targetUser, err := models.Users(models.UserWhere.ID.EQ(userID)).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	targetUser.Password = ""

	return c.JSON(200, targetUser)
}




