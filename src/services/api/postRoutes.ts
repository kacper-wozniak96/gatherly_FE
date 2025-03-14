export class ApiPostRoutes {
	static createPost = `/post`;
	static updatePost = (postId: number) => `/post/${postId}`;
	static getPosts = (offset: number, search: string) => `/post?offset=${offset}&search=${search}`;
	static getPost = (postId: number) => `/post/${postId}`;
	static getPostUserBans = (postId: number, userId: number) => `/post/${postId}/bans/user/${userId}`;
	static upVotePost = (postId: number) => `/post/${postId}/upvote`;
	static downVotePost = (postId: number) => `/post/${postId}/downvote`;
	static createPostComment = (postId: number) => `post/${postId}/comment`;
	static getComments = (postId: number, offset: number) => `/post/${postId}/comments?offset=${offset}`;
	static deleteComment = (postId: number, commentId: number) => `/post/${postId}/comment/${commentId}`;
	static deletePost = (postId: number) => `/post/${postId}`;
	static applyPostBans = (postId: number, bannedUserId: number) => `/post/${postId}/bans/user/${bannedUserId}`;
	static generateActivityReport = `/post/activityReport`;
}
