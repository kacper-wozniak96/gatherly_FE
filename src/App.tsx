import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './components/routes/PrivateRoutes';
import { SignIn } from './pages/SignIn/Login';
import { SignUp } from './pages/SignUp';

export function App() {
	return (
		<Router>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/home" element={<div>home</div>} />
				</Route>
				<Route path="/login" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}
