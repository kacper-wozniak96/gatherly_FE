import { z } from 'zod';

export const signInFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
