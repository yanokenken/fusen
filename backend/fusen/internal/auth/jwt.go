package auth

import (
	"fusen/internal/models"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)
var jwtKey = []byte(os.Getenv("JWT_KEY"))

func CreateJwt(c echo.Context, user *models.User) string {
	claims := &jwt.StandardClaims{
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		Issuer:    "fuseen",
		Subject:   strconv.Itoa(user.ID),
}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.Logger().Error(err)
	}
	return tokenString
}

func VerifyJwt(c echo.Context) (int, error) {
	cookie, err := c.Cookie("auth")
	log.Println("cookie:", cookie)
	if err != nil {
		return 0, err
	}
	tokenString := cookie.Value
	claims := &jwt.StandardClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return 0, err
	}
	if !token.Valid {
		return 0, nil
	}
	id, _ := strconv.Atoi(claims.Subject)
	return id, nil
}


