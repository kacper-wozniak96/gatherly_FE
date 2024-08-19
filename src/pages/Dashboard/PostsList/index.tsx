import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Post } from './Post';

export const PostsList = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const response: AxiosResponse<PostDTO[]> = await appAxiosInstance.get(ApiPostRoutes.getPosts);
			const posts = response.data;

			return posts;
		},
	});

	return <div>{data?.map((post) => <Post post={post} />)}</div>;
};
