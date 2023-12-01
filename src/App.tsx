import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

export function App() {
	console.log('siema');

	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/home" element={<div>home</div>} />
					<Route path="*" element={<Navigate to={'/home'} />} />
				</Route>
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="*" element={<Navigate to={'/signIn'} />} />
			</Routes>
		</Router>
	);
}
