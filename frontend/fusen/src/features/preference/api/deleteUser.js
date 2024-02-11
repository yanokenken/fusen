import api from '../../../middleware/axios'

export const deleteUser = async () => {
	return await api.delete('/api/secure/user')
}
