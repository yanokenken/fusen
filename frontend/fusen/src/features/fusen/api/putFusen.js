import api from '../../../middleware/axios'
/**
 * fusenを更新する
 * @param {*} fusen 
 * @returns 
 */
export const putFusen =  async (fusen) => {
	return await api.put('/api/secure/fusen', fusen)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};

export const putFusenSortNo =  async (activeId, overId) => {
	return await api.put('/api/secure/fusen/sortno', {activeId, overId})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
}
