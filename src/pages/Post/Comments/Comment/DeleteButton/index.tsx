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
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { CommentDTO } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { MdDelete } from 'react-icons/md';

interface Props {
	comment: CommentDTO;
}

export const DeleteButton = ({ comment }: Props) => {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteCommentMutation } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.delete(ApiPostRoutes.deleteComment(comment.postId, comment.id));
				enqueueSnackbar('Comment has been deleted', { variant: 'success' });
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchComments] });
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="destructive"
									className="absolute -right-8 top-1/4 px-2 py-0 hidden group-hover:block"
								>
									<MdDelete className="text-xl" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete comment</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl">Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription className="text-xl">
						This action cannot be undone. This will permanently delete your comment.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="text-xl">Cancel</AlertDialogCancel>
					<AlertDialogAction className="p-0" onClick={() => deleteCommentMutation()}>
						<Button className="text-xl w-full" variant="destructive">
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
