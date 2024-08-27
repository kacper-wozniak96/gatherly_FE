import { UserDTO } from './user';

export interface CreatePostDTO {
	title: string;
	description: string;
}

export interface IPost {
	id: number;
	userId: number;
	title: string;
	text?: string;
}

// export interface PostDTO {
// 	id: number;
// 	title: string;
// 	text: string;
// 	user: UserDTO;
// 	upVotesTotalNumber: number;
// 	downVotesTotalNumber: number;
// 	isUpVotedByUser: boolean;
// 	isDownVotedByUser: boolean;
// 	createdAt: Date;
// 	postCommentTotalNumber: number;
// }

export interface PostDTO {
	id: number;
	title: string;
	text: string;
	user: UserDTO;
	upVotesTotalNumber: number;
	downVotesTotalNumber: number;
	isUpVotedByUser: boolean;
	isDownVotedByUser: boolean;
	createdAt: Date;
	postCommentsTotalNumber: number;
	comments: CommentDTO[];
}

export interface CommentDTO {
	id: number;
	postId: number;
	text: string;
	user: UserDTO;
}
