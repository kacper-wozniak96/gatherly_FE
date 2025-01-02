export class ApiUserRoutes {
	static login = `/user/login`;
	static loginAsGuest = `/user/login/guest`;
	static generateActivityReport = `/user/activityReport`;
	static createUser = `/user`;
	static getUser = (userId: number) => `/user/${userId}`;
	static getUsers = (search: string) => `/user?search=${search}`;
	static updateUser = (userId: number) => `/user/${userId}`;
	static userLogout = `/user/logout`;
}
