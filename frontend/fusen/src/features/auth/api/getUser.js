import axios from 'axios'
import Cookies from 'js-cookie'

export const getUser = async () => {
	const res = await axios.get('http://localhost:1323/api/secure/user', {
		headers: {
			'Authorization': 'Bearer ' + Cookies.get('auth')
		}
	})
	return res;
}
