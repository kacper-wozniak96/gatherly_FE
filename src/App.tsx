import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';

export function App() {
	console.log('siema');

	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<Navigate to={'/dashboard'} />} />
				</Route>
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="*" element={<Navigate to={'/signIn'} />} />
			</Routes>
		</Router>
	);
}
