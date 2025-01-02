import { postTextSchema, postTitleSchema } from 'gatherly-types';
import { z } from 'zod';

export const createPostSchema = z.object({}).merge(postTextSchema).merge(postTitleSchema);

export type CreatePostFormType = z.infer<typeof createPostSchema>;
