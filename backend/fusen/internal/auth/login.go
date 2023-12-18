package auth

import (
	"fusen/db"
	"fusen/internal/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Login(c echo.Context) error {
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()
	user := new(models.User)
	
	if err := c.Bind(&user); err != nil {
		return err
	}

	loginUser, err := models.Users(models.UserWhere.Email.EQ(user.Email), models.UserWhere.AccountType.EQ("free") ).One(c.Request().Context(), db)
	if err != nil {
		return err
	}

	if loginUser.Email == "" {
		return c.JSON(http.StatusUnauthorized, "メールアドレス、またはパスワードが間違っています")
	}

	if !CompareHashAndPassword(loginUser.Password, user.Password) {
		return c.JSON(http.StatusUnauthorized, "メールアドレス、またはパスワードが間違っています")
	}

	jwt := CreateJwt(c, loginUser)
	return c.JSON(http.StatusOK, jwt)

}