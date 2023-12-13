import axios from 'axios'

export const login = async (email, password) => {
	const obj = {
		email: email,
		password: password
	}
	const res = await axios.post('http://localhost:1323/api/login', obj)
	return res
}