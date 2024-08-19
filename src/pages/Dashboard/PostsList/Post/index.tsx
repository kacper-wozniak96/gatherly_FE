import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { PostDTO } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

export interface PostProps {
	post: PostDTO;
}

export const Post = (props: PostProps) => {
	const { post } = props;

	const queryClient = useQueryClient();

	const { mutateAsync: upVotePost } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.upVotePost(post.id));
			} catch (error) {}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	return (
		<Card className="my-5">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{post.text}</CardDescription>
			</CardContent>
			<CardFooter className="flex">
				<Button variant={post.isDownVotedByUser ? 'destructive' : 'outline'}>
					<FaThumbsDown />
					<span className="ml-2">{post.downVotesTotal}</span>
				</Button>
				<Button
					className="mx-2"
					variant={post.isUpVotedByUser ? 'default' : 'outline'}
					onClick={() => upVotePost()}
				>
					<FaThumbsUp />
					<span className="ml-2">{post.upVotesTotal}</span>
				</Button>
			</CardFooter>
		</Card>
	);
};
