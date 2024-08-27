import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';

import { AppRoutes } from '@/components/routes/AppRoutes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaArrowLeft } from 'react-icons/fa';
import { Comments } from './Comments';
import { DeletePost } from './DeletePost';
import { NewComment } from './NewComment';
import { PostDetails } from './PostDetails';

export const Post = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		isPending,
		isError,
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['fetchPost'],
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
		<div className="flex flex-col items-center w-screen h-screen bg-slate-200">
			<div className="w-[60rem]">
				<div className="flex items-center justify-between">
					<FaArrowLeft
						className="my-5 text-3xl cursor-pointer"
						onClick={() => navigate(AppRoutes.toDashboard)}
					/>
					<DeletePost post={post} />
				</div>
				<PostDetails post={post} />
				<Card>
					<CardHeader>
						<CardTitle>Comments</CardTitle>
					</CardHeader>
					<CardContent>
						<NewComment post={post} />
						<Comments />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
