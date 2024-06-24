import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = Cookies.get('auth')
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}
	return config;
}, (error) => {
	// 401の場合はログインモーダルを表示
	if (error.response.status === 401) {
		document.getElementById('login_modal').showModal();
	}else {
		return Promise.reject(error);
	}
});

api.interceptors.response.use((response) => {

	return response
}, (error) => {

	console.log('error', error);
	// 401の場合はログインモーダルを表示
	if (error.response.status === 401) {
		document.getElementById('login_modal').showModal();
	}else {
		return Promise.reject(error);
	}
});

export default api;