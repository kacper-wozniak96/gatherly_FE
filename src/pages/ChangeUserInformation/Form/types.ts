import { UserDTO, usernameSchema } from 'gatherly-types';
import { z } from 'zod';

export interface Props {
	user: UserDTO;
}

export const formSchema = z
	.object({
		avatar: z
			.instanceof(FileList)
			.optional()
			.default(new DataTransfer().files)
			.refine((files) => files.length === 0 || files[0]?.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
			.refine(
				(files) => files.length === 0 || ['image/jpeg', 'image/png'].includes((files as FileList)[0]?.type),
				'Only JPEG and PNG files are allowed'
			),
	})
	.merge(usernameSchema);

export type FormTypes = z.infer<typeof formSchema>;
