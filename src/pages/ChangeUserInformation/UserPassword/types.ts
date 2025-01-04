import { confirmPasswordSchema, passwordSchema, UserDTO } from 'gatherly-types';
import { z } from 'zod';

export interface Props {
	user: UserDTO;
}

export const formSchema = z.object({}).merge(passwordSchema).merge(confirmPasswordSchema);

export type FormTypes = z.infer<typeof formSchema>;
