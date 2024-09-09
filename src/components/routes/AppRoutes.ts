export class AppRoutes {
	static toDashboard = '/dashboard';
	static toSignUp = '/signUp';
	static toSignIn = '/signIn';
	static toPost = `/dashboard/post/:id`;
	static toPostSettings = `/dashboard/post/:id/settings`;
	static toChangeUserInformation = `/profile`;
	static toGenerateActivityReports = '/activityReport';
	static toChangePassword = `/changePassword`;
	static wildCard = '*';

	static redirectToPost(id: number) {
		return `/dashboard/post/${id}`;
	}

	static redirectToPostSettings(id: number) {
		return `/dashboard/post/${id}/settings`;
	}
}
