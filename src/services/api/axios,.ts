import axios from 'axios';
import { baseRoute } from './baseRoute';

export const appAxiosInstance = axios.create({
	withCredentials: true, // This enables sending cookies with requests
	baseURL: baseRoute, // Replace with your API base URL
});
