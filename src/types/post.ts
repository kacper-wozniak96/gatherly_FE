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

export interface PostDTO {
	id: number;
	title: string;
	text: string;
	user: UserDTO;
	upVotesTotal: number;
	downVotesTotal: number;
	isUpVotedByUser: boolean;
	isDownVotedByUser: boolean;
}
