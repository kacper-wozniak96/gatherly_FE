import { PostBanDTO } from 'gatherly-types';
import { z } from 'zod';

export interface BansProps {
	userId: number;
	postUserBans: PostBanDTO[];
}

export const postBansFormSchema = z.object({
	isBannedFromViewingPost: z.boolean(),
	isBannedFromAddingComments: z.boolean(),
	isBannedFromVoting: z.boolean(),
});

export type PostBansFormValues = z.infer<typeof postBansFormSchema>;
