import { confirmPasswordSchema, passwordSchema, usernameSchema } from 'gatherly-types';
import { z } from 'zod';

export const signUpFormSchema = z.object({}).merge(usernameSchema).merge(passwordSchema).merge(confirmPasswordSchema);

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
