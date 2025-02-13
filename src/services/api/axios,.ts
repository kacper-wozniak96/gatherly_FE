import axios from 'axios';
import { baseRoute } from './baseRoute';

// console.log({ accessToken: localStorage.getItem('accessToken') });

// export const appAxiosInstance = axios.create({
// 	withCredentials: true, // This enables sending cookies with requests
// 	baseURL: baseRoute, // Replace with your API base URL
// 	headers: {
// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
// 	},
// });

// import axios from 'axios';

// Create the Axios instance
export const appAxiosInstance = axios.create({
	withCredentials: true, // This enables sending cookies with requests
	baseURL: baseRoute, // Replace with your API base URL
});

// Add a request interceptor to dynamically set the Authorization header
appAxiosInstance.interceptors.request.use(
	(config) => {
		// Retrieve the accessToken from localStorage
		const accessToken = localStorage.getItem('accessToken');

		// If the accessToken exists, add it to the request headers
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		// Handle request errors
		return Promise.reject(error);
	}
);

// Add a response interceptor to handle token expiration or other errors
appAxiosInstance.interceptors.response.use(
	(response) => {
		// Handle successful responses
		return response;
	},
	(error) => {
		// Handle response errors (e.g., token expiration)
		if (error.response?.status === 401) {
			// If the error is due to an unauthorized request (e.g., expired token),
			// you can clear the token and redirect the user to the login page
			localStorage.removeItem('accessToken');
			window.location.href = '/signIn'; // Redirect to the login page
		}

		return Promise.reject(error);
	}
);
