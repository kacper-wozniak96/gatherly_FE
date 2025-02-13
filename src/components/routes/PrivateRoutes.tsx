import { localStorageAccessTokenKey, localStorageUserIdKey } from '@/utils/localStorageKeys';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { Nav } from '../Nav';

export const PrivateRoutes = () => {
	// const token = Cookies.get('accessToken');
	const userId = localStorage.getItem(localStorageUserIdKey);
	const aceessToken = localStorage.getItem(localStorageAccessTokenKey);

	console.log({ aceessToken, userId });

	return aceessToken ? (
		<div className="flex justify-center w-screen h-screen bg-slate-200">
			<nav className="w-[20rem]">
				<Nav />
			</nav>
			<div className="w-[60rem]">
				{/* <DashboardHeader />
			<Separator className="bg-slate-300" />
			<PostsList /> */}
				<Outlet />
			</div>
			<div className="w-[20rem]" />
		</div>
	) : (
		<Navigate to="/signIn" />
	);
};
