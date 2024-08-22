export class AppRoutes {
	static toDashboard = '/dashboard';
	static toSignUp = '/signUp';
	static toSignIn = '/signIn';
	static toPost = `/post/:id`;
	static toChangeUserInformation = `/profile`;
	static toChangePassword = `/changePassword`;
	static wildCard = '*';

	static redirectToPost(id: number) {
		return `/post/${id}`;
	}
}
