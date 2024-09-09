import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppRoutes } from './components/routes/AppRoutes';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { ActivityReport } from './pages/ActivityReport';
import { ChangePassword } from './pages/ChangePassword';
import { ChangeUserInformation } from './pages/ChangeUserInformation';
import { Dashboard } from './pages/Dashboard';
import { Post } from './pages/Post';
import { PostSettings } from './pages/Post/PostSettings';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export function App() {
	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path={AppRoutes.toDashboard} element={<Dashboard />} />
					<Route path={AppRoutes.toPost} element={<Post />} />
					<Route path={AppRoutes.toPostSettings} element={<PostSettings />} />
					<Route path={AppRoutes.toChangeUserInformation} element={<ChangeUserInformation />} />
					<Route path={AppRoutes.toGenerateActivityReports} element={<ActivityReport />} />
					<Route path={AppRoutes.toChangePassword} element={<ChangePassword />} />
					<Route path={AppRoutes.wildCard} element={<Navigate to={AppRoutes.toDashboard} />} />
				</Route>
				<Route path={AppRoutes.toSignIn} element={<SignIn />} />
				<Route path={AppRoutes.toSignUp} element={<SignUp />} />
				<Route path={AppRoutes.wildCard} element={<Navigate to={AppRoutes.toSignIn} />} />
			</Routes>
		</Router>
	);
}
