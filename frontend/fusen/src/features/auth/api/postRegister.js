// 新規登録処理

import axios from 'axios'

export const postRegister = async (userInfo) => {

	const res = await axios.post('http://localhost:1323/api/register', userInfo)
	return res

}