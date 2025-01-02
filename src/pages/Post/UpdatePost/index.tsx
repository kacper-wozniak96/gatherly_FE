import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PostForm } from '@/components/PostForm';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UpdatePostRequestDTO } from 'gatherly-types';
import { FaPen } from 'react-icons/fa';
import { Props, UpdatePostFormValues, updatePostInFormSchema } from './types';

export const UpdatePost = ({ post }: Props) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { handleError } = useHandleError();
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, dirtyFields },
	} = useForm<UpdatePostFormValues>({
		resolver: zodResolver(updatePostInFormSchema),
		defaultValues: {
			title: post.title,
			text: post.text,
		},
	});

	const { mutateAsync: updatePostMutation } = useMutation({
		mutationFn: async (data: UpdatePostFormValues) => {
			try {
				const dto: UpdatePostRequestDTO = {};

				if (dirtyFields.title) {
					dto.title = data.title;
				}

				if (dirtyFields.text) {
					dto.text = data.text;
				}

				await appAxiosInstance.patch(ApiPostRoutes.updatePost(post.id), dto);
				enqueueSnackbar('Post has been updated', { variant: 'success' });
				closeDialog();
				queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPost] });
			} catch (error) {
				handleError(error, setError);
			}
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
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<DialogTrigger>
								<Button className="text-xl p-3 mr-3" onClick={openDialog}>
									<FaPen />
								</Button>
							</DialogTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<span>Edit post</span>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
						onSubmit={handleSubmit((data) => updatePostMutation(data))}
						register={register}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};
