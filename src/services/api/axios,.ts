import axios from 'axios';
import Cookies from 'js-cookie';
import { baseRoute } from './baseRoute';

export const appAxiosInstance = axios.create({
	withCredentials: true, // This enables sending cookies with requests
	baseURL: baseRoute, // Replace with your API base URL
	// headers: {
	// 	Authorization: `Bearer ${Cookies.get('accessToken')}`,
	// },
});
