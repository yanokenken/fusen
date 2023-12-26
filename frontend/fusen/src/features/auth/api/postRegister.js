import api from '../../../middleware/axios'

export const postRegister = async (userInfo) => {

	const res = await api.post('/api/register', userInfo)
	return res

}