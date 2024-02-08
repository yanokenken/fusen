import api from '../../../middleware/axios'
/**
 * fusenを更新する
 * @param string theme
 * @returns 
 */
export const putTheme =  async (theme) => {
	return await api.put('/api/secure/preference', theme)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};
