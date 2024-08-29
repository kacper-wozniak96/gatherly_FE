import { CustomPagination } from '@/components/CustomPagination';
import { PostDTO } from '@/types/post';
import { useContext } from 'react';
import { DashboardContext } from '..';
import { SinglePost } from './Post';

export interface GetPostsResponseDTO {
	posts: PostDTO[];
	postsTotalCount: number;
}

export const PostsList = () => {
	const { posts, handlePageChange, isLoading, selectedPage, postsTotalCount } = useContext(DashboardContext);

	if (isLoading || !posts || !postsTotalCount) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>
				{posts.map((post) => (
					<SinglePost post={post} key={post.id} />
				))}
			</div>
			<CustomPagination
				listCount={postsTotalCount}
				offset={5}
				handlePageChange={handlePageChange}
				selectedPage={selectedPage}
			/>
		</>
	);
};
