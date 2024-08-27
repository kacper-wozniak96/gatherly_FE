import { CustomPagination } from '@/components/CustomPagination';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';
import { SinglePost } from './Post';

interface GetPostsResponseDTO {
	posts: PostDTO[];
	postsTotalCount: number;
}

export const PostsList = () => {
	const [selectedPage, setSelectedPage] = useState(1);

	const offset = useMemo(() => (selectedPage - 1) * 5, [selectedPage]);

	const { isLoading, isError, data, error } = useQuery({
		queryKey: [ReactQueryKeys.fetchPosts, offset],
		queryFn: async () => {
			const response: AxiosResponse<GetPostsResponseDTO> = await appAxiosInstance.get(
				ApiPostRoutes.getPosts(offset)
			);
			const data = response.data;

			return data;
		},
	});

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
	};

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>
				{data.posts.map((post) => (
					<SinglePost post={post} key={post.id} />
				))}
			</div>
			<CustomPagination
				listCount={data.postsTotalCount}
				offset={5}
				handlePageChange={handlePageChange}
				selectedPage={selectedPage}
			/>
		</>
	);
};
