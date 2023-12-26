import api from '../../../middleware/axios'
/**
 * fusenを更新する
 * @param {*} fusen 
 * @returns 
 */
export const deleteFusen =  async (fusenId) => {
	console.log("deleteFusen:", fusenId)
	return await api.delete(`/api/secure/fusen/${fusenId}`)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};
