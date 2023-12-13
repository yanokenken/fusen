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
		log.Println("パスワードが一致しませんでした。")
		log.Println(err)
		return false
	}

	return true
}


func sampleComp() {
	password := "test1234"

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
			panic(err)
	}
	log.Printf("sample-------hashed: %s\n", hashed)

	// invalid pass
	err = bcrypt.CompareHashAndPassword(hashed, []byte("foobar"))
	if err != nil {
			log.Println("sample-------",err)
	}

	// correct pass
	err = bcrypt.CompareHashAndPassword(hashed, []byte(password))
	if err != nil {
			panic(err)
	}
	log.Println("sample-------correct")
}