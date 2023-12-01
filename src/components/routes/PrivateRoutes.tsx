import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
	const token = Cookies.get('accessToken');

	return token ? <Outlet /> : <Navigate to="/signIn" />;
};
