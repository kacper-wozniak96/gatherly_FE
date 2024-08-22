import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { SinglePost } from '../Dashboard/PostsList/Post';

import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FaComment, FaRegComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { NewComment } from './NewComment';
import { PostComments } from './PostComments';
import { PostDetails } from './PostDetails';

export const Post = () => {
	const { id } = useParams<{ id: string }>();

	const {
		isPending,
		isError,
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: [...ReactQueryKeys.fetchPost, id],
		queryFn: async () => {
			const response: AxiosResponse<PostDTO> = await appAxiosInstance.get(ApiPostRoutes.getPost(Number(id)));
			const post = response.data;

			return post;
		},
	});

	if (isLoading || !post) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center w-screen h-screen bg-slate-300">
			<div className="w-[60rem]">
				<PostDetails post={post} />
				<Card>
					<CardHeader>
						<CardTitle>Comments</CardTitle>
					</CardHeader>
					<CardContent>
						<NewComment post={post} />
						<PostComments />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
