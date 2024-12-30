import { confirmPasswordSchema, passwordSchema, usernameSchema } from 'gatherly-types';
import { z } from 'zod';

export const signUpFormSchema = z
	.object({
		username: usernameSchema,
		password: passwordSchema,
		confirmPassword: confirmPasswordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
