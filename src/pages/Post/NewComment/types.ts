import { commentSchema, PostDTO } from 'gatherly-types';
import { z } from 'zod';

export interface NewCommentProps {
	post: PostDTO;
}

export const createCommentFormSchema = commentSchema;
export type CreateCommentFormValues = z.infer<typeof createCommentFormSchema>;
