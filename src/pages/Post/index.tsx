import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { localStorageUserIdKey } from '@/utils/accessToken';
import { FaArrowLeft } from 'react-icons/fa';
import { RiUserSettingsFill } from 'react-icons/ri';
import { PostBreadcrumbs } from './Breadcrumbs';
import { Comments } from './Comments';
import { DeletePost } from './DeletePost';
import { NewComment } from './NewComment';
import { PostDetails } from './PostDetails';
import { UpdatePost } from './UpdatePost';

export const Post = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const storedUserId = localStorage.getItem(localStorageUserIdKey);

	const {
		isPending,
		isError,
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: [ReactQueryKeys.fetchPost],
		queryFn: async () => {
			const response: AxiosResponse<PostDTO> = await appAxiosInstance.get(ApiPostRoutes.getPost(Number(id)));
			const post = response.data;

			return post;
		},
	});

	if (isLoading || !post) {
		return <div>Loading...</div>;
	}

	const isPostCreatedByCurrentLoggedInUser = Number(storedUserId) === post.user.id;

	return (
		<>
			<PostBreadcrumbs />
			{/* <FaArrowLeft className="my-5 text-3xl cursor-pointer" onClick={() => navigate(AppRoutes.toDashboard)} /> */}
			<div className="flex justify-end">
				{isPostCreatedByCurrentLoggedInUser && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="text-3xl p-3 mr-3 bg-slate-500 hover:bg-slate-500"
									onClick={() => navigate(AppRoutes.redirectToPostSettings(Number(id)))}
								>
									<RiUserSettingsFill />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<span>Post settings</span>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				{isPostCreatedByCurrentLoggedInUser && <UpdatePost post={post} />}
				{isPostCreatedByCurrentLoggedInUser && <DeletePost post={post} />}
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
		</>
	);
};
