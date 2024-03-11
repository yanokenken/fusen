package auth

import (
	"errors"
	"os"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)


func HashAndSalt(pwd string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func CompareHashAndPassword(hashedPwd, plainPwd string) bool {

	err := bcrypt.CompareHashAndPassword([]byte(hashedPwd), []byte(plainPwd))
	return err == nil
}

// 認証済みのユーザーIDを取得する
func GetUserID(c echo.Context) (int, error) {
	// headerのauthを取得
	auth := c.Request().Header.Get("Authorization")
	// tokenをパース、Bearerを削除
	tokenString := strings.Replace(auth, "Bearer ", "", 1)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {		
		return []byte(os.Getenv("JWT_KEY")), nil
	})
	if err != nil {
		return 0, err
	}
	// クレーム情報を取得
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, err
	}
	// userIDを取得
	userIDStr, ok := claims["sub"].(string)
	if !ok {
			return 0, errors.New("could not convert claims['sub'] to string")
	}
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
			return 0, err
	}
	return userID, nil
}
