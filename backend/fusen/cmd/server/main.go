package main

import (
	"fusen/internal/auth"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)	

func main() {
	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		//AllowMethods　すべてのメソッドを許可
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},

	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")	
	})
	e.POST("/api/register", auth.Register)
	e.PUT("/api/register", auth.FinalizeRegistration)
	e.POST("/api/login", auth.Login)

	e.Logger.Fatal(e.Start(":1323"))



}
