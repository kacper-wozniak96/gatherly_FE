import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useHandleFormError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface NewCommentProps {
	post: PostDTO;
}

const createCommentFormSchema = z.object({
	comment: z.string().trim().min(1).max(5),
});

type CreateCommentFormValues = z.infer<typeof createCommentFormSchema>;

interface CreateCommentRequestDTO {
	postId: number;
	comment: string;
}

export const NewComment = ({ post }: NewCommentProps) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { handleFormError } = useHandleFormError();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<CreateCommentFormValues>({
		resolver: zodResolver(createCommentFormSchema),
	});

	const { mutateAsync: createComment } = useMutation({
		mutationFn: async (data: CreateCommentFormValues) => {
			try {
				const requestData: CreateCommentRequestDTO = {
					postId: post.id,
					comment: data.comment,
				};
				await appAxiosInstance.post(ApiPostRoutes.createComment, requestData);
			} catch (error) {
				handleFormError(error, setError);
			}
		},
		onSuccess: () => {
			reset();
			enqueueSnackbar('Comment added', { variant: 'success' });
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchComments] });
		},
	});

	return (
		<form className="flex w-full items-center space-x-2" onSubmit={handleSubmit((data) => createComment(data))}>
			<Input
				{...register('comment')}
				type="text"
				placeholder="Your Comment ..."
				className="grow"
				errorMessage={errors.comment?.message}
			/>
			<Button type="submit" className="text-xl">
				Add
			</Button>
		</form>
	);
};
