export class AppRoutes {
	static toDashboard = '/dashboard';
	static toSignUp = '/signUp';
	static toSignIn = '/signIn';
	static toPost = `/post/:id`;
	static toProfile = `/profile`;
	static wildCard = '*';

	static redirectToPost(id: number) {
		return `/post/${id}`;
	}
}
