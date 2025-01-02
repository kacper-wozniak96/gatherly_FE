import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCommentRequestDTO } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { createCommentFormSchema, CreateCommentFormValues, NewCommentProps } from './types';

export const NewComment = ({ post }: NewCommentProps) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

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
				const dto: CreateCommentRequestDTO = {
					comment: data.comment as string,
				};
				await appAxiosInstance.post(ApiPostRoutes.createPostComment(post.id), dto);

				reset();
				enqueueSnackbar('Comment added', { variant: 'success' });
				queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchComments] });
			} catch (error) {
				console.log({ error });
				handleError(error, setError);
			}
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
