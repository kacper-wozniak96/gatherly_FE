import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FaRegComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { PostProps } from './types';

export const SinglePost = (props: PostProps) => {
	const { post } = props;

	const queryClient = useQueryClient();

	const { mutateAsync: upVotePost } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.upVotePost(post.id));
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPosts] });
		},
	});

	const { mutateAsync: downVotePost } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.downVotePost(post.id));
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPosts] });
		},
	});

	return (
		<Card className="my-5">
			<CardHeader className="flex-row justify-between items-center">
				<a href={AppRoutes.redirectToPost(post.id)} className="flex items-center">
					<CardTitle>{post.title}</CardTitle>
				</a>
				<span className="my-0">{format(post.createdAt, 'dd-MM-yyyy')}</span>
			</CardHeader>
			<CardContent>
				<CardDescription className="italic">{post.text || 'No post description'}</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center">
				<Button variant={post.isDownVotedByUser ? 'destructive' : 'outline'} onClick={() => downVotePost()}>
					<FaThumbsDown />
					<span className="ml-2">{post.downVotesTotalNumber}</span>
				</Button>
				<Button
					className="ml-2"
					variant={post.isUpVotedByUser ? 'default' : 'outline'}
					onClick={() => upVotePost()}
				>
					<FaThumbsUp />
					<span className="ml-2">{post.upVotesTotalNumber}</span>
				</Button>
				<Separator orientation="vertical" className="self-stretch h-1/2 mx-2" />
				<div className="flex items-center">
					<FaRegComment />
					<span className="ml-2">{post.postCommentsTotalNumber}</span>
				</div>
			</CardFooter>
		</Card>
	);
};
