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
