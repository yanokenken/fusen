import api from '../../../middleware/axios'

export const getPreference = async () => {
	const ret = await api.get('/api/secure/preference')
	.then((res) => {
		return res.data;
	}).catch((error) => {
		console.error(error);
	})
	return ret;
}

