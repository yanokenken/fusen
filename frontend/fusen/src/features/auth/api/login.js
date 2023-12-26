import api from '../../../middleware/axios'

export const authenticateUser = async (email, password) => {
	const obj = {
		email: email,
		password: password
	}
	const res = await api.post('/api/login', obj)
	return res
}