import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const createPostInFormSchema = z.object({
	title: z.string().min(3),
	text: z.string(),
});

type CreatePostFormValues = z.infer<typeof createPostInFormSchema>;

export const CreateNewPost = () => {
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
	} = useForm<CreatePostFormValues>({
		resolver: zodResolver(createPostInFormSchema),
	});

	const { mutateAsync: createPostMutation } = useMutation({
		mutationFn: async (data: CreatePostFormValues) => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.createPost, data);
				enqueueSnackbar('Post has been created', { variant: 'success' });
				closeDialog();
			} catch (error) {
				handleFormError(error, setError);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ReactQueryKeys.fetchPosts });
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
						{/* <span className="sr-only">Close</span> */}
					</DialogClose>
					<form onSubmit={handleSubmit((data) => createPostMutation(data))}>
						<div className="my-5">
							<Label htmlFor="title" className="" isRequired>
								Post Title
							</Label>
							<Input
								{...register('title')}
								id="title"
								className=""
								errorMessage={errors.title?.message}
							/>
						</div>
						<div className="my-10">
							<Label htmlFor="text" className="">
								Post Description
							</Label>
							<Textarea {...register('text')} id="text" placeholder="Type your post description" />
						</div>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
