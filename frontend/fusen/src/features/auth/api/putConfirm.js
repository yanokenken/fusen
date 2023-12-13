import axios from 'axios'

export const putConfirm = async (token) => {
	const obj = {
		confirmation_token: token
	}
	const res = await axios.put('http://localhost:1323/api/register', obj)
	return res

}