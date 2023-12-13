package auth

import (
	"context"
	"fusen/db"
	"fusen/internal/models"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)



func FinalizeRegistration (c echo.Context) error {
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	
	// tokenの確認
	user := new(models.User)

	if err := c.Bind(&user); err != nil {
		return err
	}
	log.Println("confirm------------1")
	log.Println(user.ConfirmationToken)
	// tokenに一致するユーザーを取得する
	user, err = models.Users(models.UserWhere.ConfirmationToken.EQ(user.ConfirmationToken)).One(context.Background(), db)	
	if err != nil {
		return err
	}
	// todo 初回登録時からの時間が24時間を超えていたらエラーを返す

	// ユーザーのステータスを変更する
	user.AccountType = "free"
	user.ConfirmationToken = null.StringFrom("")

	id, err := user.Update(context.Background(), db, boil.Infer())
	if err != nil {
		return err
	}
	log.Println(id)
	
	return c.JSON(http.StatusOK, id)
}
