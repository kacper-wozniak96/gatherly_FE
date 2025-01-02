import { z } from 'zod';

export const signInFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;
