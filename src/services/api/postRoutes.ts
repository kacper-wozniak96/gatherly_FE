import { baseRoute } from './baseRoute';

export class ApiPostRoutes {
	static createPost = `/post`;
	static getPosts = `/post`;
	static upVotePost = (postId: number) => `/post/${postId}/upvote`;
}
