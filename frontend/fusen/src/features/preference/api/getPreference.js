import api from '../../../middleware/axios'

export const getPreference = async () => {
	console.log('getPreference!')
	const res = await api.get('/api/secure/preference')
	return res.data;
}

