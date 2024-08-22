export class ApiPostRoutes {
	static createPost = `/post`;
	static getPosts = `/post`;
	static getPost = (postId: number) => `/post/${postId}`;
	static upVotePost = (postId: number) => `/post/${postId}/upvote`;
	static downVotePost = (postId: number) => `/post/${postId}/downvote`;
	static createComment = `/comment`;
}
