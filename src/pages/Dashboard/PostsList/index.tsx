import { CustomPagination } from '@/components/CustomPagination';
import { useContext } from 'react';
import { DashboardContext } from '..';
import { NoPosts } from './NoPosts';
import { SinglePost } from './Post';
import { PostsListSkeleton } from './PostsListSkeleton';

export const PostsList = () => {
	const { posts, handlePageChange, isLoading, selectedPage, postsTotalCount } = useContext(DashboardContext);

	if (isLoading) {
		return <PostsListSkeleton />;
	}

	if (!posts || !postsTotalCount) {
		return <NoPosts />;
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
