package auth

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fusen/db"
	"fusen/internal/models"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

// Register は、ユーザー登録を行う。
func Register(c echo.Context) error {
	// 実行時ログを出力する
	log.Println("ユーザー登録を開始します。")
	
	token := make([]byte, 32)
	_, err := rand.Read(token)
	if err != nil {
		return err
	}


	tokenStr := hex.EncodeToString(token)
	log.Println(tokenStr)	

	user := new(models.User)
	if err := c.Bind(&user); err != nil {
		return err
	}

	log.Println("入力パスワード------------:",user.Password)
	hashedPW, err := HashAndSalt(user.Password)
	if err != nil {
		// パスワードが不正でした
		c.String(http.StatusInternalServerError, "パスワードが正しく登録できませんでした。")
		return err
	}

	log.Println("test------------1")
	user.Password = hashedPW

	// ユーザー登録
	db, err := db.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	log.Println("test------------2")
	// 登録日付を設定する
	const layout = "2006-01-02 15:04:05"
	now := time.Now()
	user.CreatedAt, err = time.Parse(layout, now.Format(layout))
	if err != nil {
			return err
	}

	//　email, slugの重複チェック
	// email
	count, err := models.Users(models.UserWhere.Email.EQ(user.Email)).Count(context.Background(), db)
	if err != nil {
		log.Fatal(err)
	}
	if count > 0 {
		return c.JSON(http.StatusInternalServerError, "このメールアドレスは既に登録されています。")
	}
	// slug
	count, err = models.Users(models.UserWhere.Slug.EQ(user.Slug)).Count(context.Background(), db)
	if err != nil {
		log.Fatal(err)
	}
	if count > 0 {
		return c.JSON(http.StatusInternalServerError, "このユーザーIDは既に登録されています。別のIDを指定してください。")
	}

	// ユーザー登録
	newUser := &models.User{
		Name: user.Name,
		Slug: user.Slug,
		Email: user.Email,
		Password: user.Password,
		AccountType: "pending",
		ConfirmationToken: null.StringFrom(tokenStr),
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.CreatedAt,
	}
	log.Println(newUser)
	ctx := context.Background()
	ctx = boil.WithDebug(ctx, true)
	err = newUser.Insert(ctx, db, boil.Infer())
	if err != nil {
		log.Fatal(err)
		return c.JSON(http.StatusInternalServerError, "ユーザー登録に失敗しました。")
	}
	// 登録確認メールを送信する
	err = SendConfirmationEmail(newUser)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, "ユーザー仮登録が完了しました。")

}


// 登録確認メールを送信する
func SendConfirmationEmail(user *models.User) error {

  // メール本文
	rootUrl := os.Getenv("ROOT_URL")
	url := rootUrl+"/confirm?token=" + user.ConfirmationToken.String
	body := "以下のURLをクリックして、ユーザー登録を完了してください。\n" + 
					"心当たりがない場合は、このメールを破棄してください。\n" +
					url

	// smtpサーバーの設定
	smtpServer := os.Getenv("SMTP_SERVER")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPassword := os.Getenv("SMTP_PASSWORD")

	// メール送信
	auth := smtp.PlainAuth("", smtpUser, smtpPassword, smtpServer)
	to := []string{user.Email}
	msg := []byte("To: " + user.Email + "\r\n" +
		"Subject: 【FUSEEN】ユーザー登録の確認\r\n" +
		"\r\n" +
		body + "\r\n")
	err := smtp.SendMail(smtpServer+":"+smtpPort, auth, smtpUser, to, msg)
	if err != nil {
		return err
	}
	return nil
}