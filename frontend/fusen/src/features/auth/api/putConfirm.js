import api from '../../../middleware/axios'

export const putConfirm = async (token) => {
	const obj = {
		confirmation_token: token
	}
	const res = await api.put('/api/register', obj)
	return res

}