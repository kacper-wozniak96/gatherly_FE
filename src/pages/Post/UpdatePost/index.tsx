import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHandleFormError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PostForm } from '@/components/PostForm';
import { PostDTO } from '@/types/post';
import { FaPen } from 'react-icons/fa';

const updatePostInFormSchema = z.object({
	title: z.string().min(3),
	text: z.string(),
});

type UpdatePostFormValues = z.infer<typeof updatePostInFormSchema>;

interface Props {
	post: PostDTO;
}

export const UpdatePost = ({ post }: Props) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { handleFormError } = useHandleFormError();
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<UpdatePostFormValues>({
		resolver: zodResolver(updatePostInFormSchema),
		defaultValues: {
			title: post.title,
			text: post.text,
		},
	});

	const { mutateAsync: createPostMutation } = useMutation({
		mutationFn: async (data: UpdatePostFormValues) => {
			try {
				await appAxiosInstance.patch(ApiPostRoutes.updatePost(post.id), data);
				enqueueSnackbar('Post has been updated', { variant: 'success' });
				closeDialog();
			} catch (error) {
				handleFormError(error, setError);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPost] });
		},
	});

	useEffect(() => {
		reset();
	}, [isDialogOpen]);

	useEffect(() => {
		reset({
			title: post.title,
			text: post.text,
		});
	}, [post, reset]);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div>
			<Dialog open={isDialogOpen}>
				<DialogTrigger>
					<Button className="text-xl p-3 mr-3" onClick={openDialog}>
						<FaPen />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
					<DialogHeader>
						<DialogTitle className="text-2xl">Update post</DialogTitle>
					</DialogHeader>
					<DialogClose
						onClick={closeDialog}
						className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
					>
						<X className="h-7 w-7" />
					</DialogClose>
					<PostForm
						errors={errors}
						onSubmit={handleSubmit((data) => createPostMutation(data))}
						register={register}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};
