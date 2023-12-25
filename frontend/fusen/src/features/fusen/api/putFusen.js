import axios from "axios";
import Cookies from 'js-cookie'

/**
 * fusenを更新する
 * @param {*} fusen 
 * @returns 
 */
export const putFusen =  async (fusen) => {
	return await axios.put('http://localhost:1323/api/secure/fusen', fusen, {
			headers: {
				'Authorization': 'Bearer ' + Cookies.get('auth')
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			console.error(error);
			return error;
		});
};
