import { PostForm } from '@/components/PostForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePostRequestDTO } from 'gatherly-types';
import { X } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreatePostFormType, createPostSchema } from './types';

export const CreateNewPost = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { handleError } = useHandleError();
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<CreatePostFormType>({
		resolver: zodResolver(createPostSchema),
	});

	const { mutateAsync: createPostMutation } = useMutation({
		mutationFn: async (data: CreatePostFormType) => {
			try {
				const dto: CreatePostRequestDTO = {
					title: data.title,
					text: data.text,
				};

				await appAxiosInstance.post(ApiPostRoutes.createPost, dto);
				enqueueSnackbar('Post has been created', { variant: 'success' });
				closeDialog();
				queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPosts] });
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	useEffect(() => {
		reset();
	}, [isDialogOpen]);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div>
			<Dialog open={isDialogOpen}>
				<Button className="text-xl p-6" onClick={openDialog}>
					Create new post
				</Button>
				<DialogTrigger asChild></DialogTrigger>
				<DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
					<DialogHeader>
						<DialogTitle className="text-2xl">New post</DialogTitle>
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
