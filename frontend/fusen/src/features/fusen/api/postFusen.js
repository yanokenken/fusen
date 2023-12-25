import axios from "axios";
import Cookies from 'js-cookie'
import { getFusens } from "./getFusens";

/**
 * fusenを追加する
 * @param {*} fusen 
 * @returns 
 */
export const postFusen =  async (fusen) => {

	fusen.ID = 0;// 新規は一旦0を設定（go側のstructの都合）
	return await axios.post('http://localhost:1323/api/secure/fusen', fusen, {
			headers: {
				'Authorization': 'Bearer ' + Cookies.get('auth')
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
		});
};

