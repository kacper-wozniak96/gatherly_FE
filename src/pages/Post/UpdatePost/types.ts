import { PostDTO, postTextSchema, postTitleSchema } from 'gatherly-types';
import { z } from 'zod';

export const updatePostInFormSchema = z.object({}).merge(postTextSchema).merge(postTitleSchema);

export type UpdatePostFormValues = z.infer<typeof updatePostInFormSchema>;

export interface Props {
	post: PostDTO;
}
