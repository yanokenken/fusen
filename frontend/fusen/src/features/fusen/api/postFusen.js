import api from '../../../middleware/axios'
import { getFusens } from "./getFusens";

/**
 * fusenを追加する
 * @param {*} fusen 
 * @returns 
 */
export const postFusen =  async (fusen) => {
	fusen.ID = 0;// 新規は一旦0を設定（go側のstructの都合）
	return await api.post('/api/secure/fusen', fusen)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
		});
};

