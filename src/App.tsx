import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppRoutes } from './components/routes/AppRoutes';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { Dashboard } from './pages/Dashboard';
import { Post } from './pages/Post';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function App() {
	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path={AppRoutes.toDashboard} element={<Dashboard />} />
					<Route path={AppRoutes.toPost} element={<Post />} />
					<Route path={AppRoutes.toProfile} element={<Profile />} />
					<Route path={AppRoutes.wildCard} element={<Navigate to={AppRoutes.toDashboard} />} />
				</Route>
				<Route path={AppRoutes.toSignIn} element={<SignIn />} />
				<Route path={AppRoutes.toSignUp} element={<SignUp />} />
				<Route path={AppRoutes.wildCard} element={<Navigate to={AppRoutes.toSignIn} />} />
			</Routes>
		</Router>
	);
}
