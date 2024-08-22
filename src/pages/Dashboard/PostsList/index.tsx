import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { SinglePost } from './Post';

export const PostsList = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ReactQueryKeys.fetchPosts,
		queryFn: async () => {
			const response: AxiosResponse<PostDTO[]> = await appAxiosInstance.get(ApiPostRoutes.getPosts);
			const posts = response.data;

			return posts;
		},
		// staleTime: 0, // Data is considered stale immediately
		// gcTime: 0,
		// cacheTime: 0, // Cache is cleared immediately after the query becomes inactive
	});

	return <div>{data?.map((post) => <SinglePost post={post} key={post.id} />)}</div>;
};
