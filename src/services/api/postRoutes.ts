export class ApiPostRoutes {
	static createPost = `/post`;
	static updatePost = (postId: number) => `/post/${postId}`;
	static getPosts = (offset: number, search: string) => `/post?offset=${offset}&search=${search}`;
	static getPost = (postId: number) => `/post/${postId}`;
	static upVotePost = (postId: number) => `/post/${postId}/upvote`;
	static downVotePost = (postId: number) => `/post/${postId}/downvote`;
	static createComment = `/comment`;
	static getUser = (userId: number) => `/user/${userId}`;
	static updateUser = (userId: number) => `/user/${userId}`;
	static getComments = (postId: number, offset: number) => `/post/${postId}/comments?offset=${offset}`;
	static deleteComment = (postId: number, commentId: number) => `/post/${postId}/comment/${commentId}`;
	static deletePost = (postId: number) => `/post/${postId}`;
}
