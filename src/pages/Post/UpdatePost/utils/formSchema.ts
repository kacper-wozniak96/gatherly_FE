import { z } from 'zod';

export const updatePostInFormSchema = z.object({
	title: z.string().min(3),
	text: z.string(),
});

export type UpdatePostFormValues = z.infer<typeof updatePostInFormSchema>;
