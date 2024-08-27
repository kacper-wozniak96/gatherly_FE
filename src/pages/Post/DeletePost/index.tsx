import { AppRoutes } from '@/components/routes/AppRoutes';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { PostDTO } from '@/types/post';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {
	post: PostDTO;
}

export const DeletePost = ({ post }: Props) => {
	const navigate = useNavigate();

	const { mutateAsync: deletePostMutation } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.delete(ApiPostRoutes.deletePost(post.id));
				enqueueSnackbar('Post has been deleted', { variant: 'success' });
			} catch (error) {}
		},
		onSuccess: () => {
			navigate(AppRoutes.toDashboard);
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="destructive" className="-right-8 top-1/4 px-2 py-0">
									<MdDelete className="text-2xl" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete post</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl">Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription className="text-xl">
						This action cannot be undone. This will permanently delete your post.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="text-xl">Cancel</AlertDialogCancel>
					<AlertDialogAction className="p-0" onClick={() => deletePostMutation()}>
						<Button className="text-xl w-full" variant="destructive">
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
