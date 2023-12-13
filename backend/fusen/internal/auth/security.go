package auth

import (
	"log"

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
	log.Println("hashedPwd:", hashedPwd)
	log.Println("plainPwd:", plainPwd)
	err := bcrypt.CompareHashAndPassword([]byte(hashedPwd), []byte(plainPwd))

	if err != nil {
		log.Println("パスワードが一致しませんでした。", err)
		return false
	}

	return true
}
