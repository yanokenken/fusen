# テーブル変更時メモ
- container上で以下がなければinstall

`go install github.com/volatiletech/sqlboiler/v4@latest`
`go install github.com/volatiletech/sqlboiler/v4/drivers/sqlboiler-psql@latest`

- `scripts/`にサンプルのtomlがあるのでそれを整えて

`sqlboiler psql`

- 同じ階層に`models`が生成されるので置き換える
