import api from '../../../middleware/axios'

export const getUser = async () => {
	return await api.get('/api/secure/user')
}
