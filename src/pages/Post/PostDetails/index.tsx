import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserDTO } from '@/types/user';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

interface PostDetailsProps {
	post: PostDTO;
}

export const PostDetails = ({ post }: PostDetailsProps) => {
	const queryClient = useQueryClient();

	const { mutateAsync: upVotePost } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.upVotePost((post as PostDTO).id));
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPost] });
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPosts] });
		},
	});

	const { mutateAsync: downVotePost } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.downVotePost((post as PostDTO).id));
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPost] });
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPosts] });
		},
	});

	return (
		<Card className="my-5">
			<CardHeader className="flex-column">
				<CardTitle>{post?.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="italic">{post?.text || 'No post description'}</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<div>
					<Button
						variant={(post as PostDTO).isDownVotedByUser ? 'destructive' : 'outline'}
						onClick={() => downVotePost()}
					>
						<FaThumbsDown />
						<span className="ml-2">{(post as PostDTO).downVotesTotalNumber}</span>
					</Button>
					<Button
						className="ml-2"
						variant={(post as PostDTO).isUpVotedByUser ? 'default' : 'outline'}
						onClick={() => upVotePost()}
					>
						<FaThumbsUp />
						<span className="ml-2">{(post as PostDTO).upVotesTotalNumber}</span>
					</Button>
				</div>
				<div className="flex flex-row justify-between items-center self-end">
					<span className="mr-2">Created by:</span>
					<Avatar className="w-8 h-8 mr-2">
						<AvatarImage src={post?.user?.avatarSignedURL ?? ''} alt="@shadcn" />
						<AvatarFallback className="text-xl">
							{getFirstLetterOfUsername(post?.user as UserDTO)}
						</AvatarFallback>
					</Avatar>
					<span className="mr-2 font-bold">{(post as PostDTO).user.username}</span>
					<span className="mr-2">at</span>
					<span className="italic">{format((post as PostDTO).createdAt, 'dd-MM-yyyy HH:mm')}</span>
				</div>
			</CardFooter>
		</Card>
	);
};
