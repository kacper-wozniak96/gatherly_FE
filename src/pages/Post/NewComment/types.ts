import { commentSchema, PostDTO } from 'gatherly-types';
import { z } from 'zod';

export interface NewCommentProps {
	post: PostDTO;
}

export const createCommentFormSchema = commentSchema;
export type CreateCommentFormTypes = z.infer<typeof createCommentFormSchema>;
