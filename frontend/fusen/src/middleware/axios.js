import axios from "axios";
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";

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
	return Promise.reject(error);
});

api.interceptors.response.use((response) => {
	return response
}, (error) => {
	console.log('error', error);
	if (error.response.status === 401) {
		Cookies.remove('auth')
		alert('ログイン情報が無効です。再度ログインしてください。')
	}
	return Promise.reject(error);
});

export default api;