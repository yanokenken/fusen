package main

import (
	"fusen/internal/auth"
	"fusen/internal/handler"
	"net/http"
	"os"

	jwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)	

func main() {
	e := echo.New()
	
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete, http.MethodOptions},
	}))

	api := e.Group("/api")

	secure := e.Group("/api/secure")
	secure.Use(jwt.JWT([]byte(os.Getenv("JWT_KEY"))))

	api.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")	
	})

	api.POST("/register", auth.Register)
	api.PUT("/register", auth.FinalizeRegistration)
	api.POST("/login", auth.Login)

	secure.GET("/user", handler.GetUser)
	

	e.Logger.Fatal(e.Start(":1323"))

}
