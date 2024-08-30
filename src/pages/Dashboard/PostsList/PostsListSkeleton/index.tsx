import { Skeleton } from '@/components/ui/skeleton';

export const PostsListSkeleton = () => {
	return (
		<main className="mt-5">
			<Skeleton className="h-32 mx-5 rounded-2xl mt-2" />;
			<Skeleton className="h-32 mx-5 rounded-2xl mt-2" />;
			<Skeleton className="h-32 mx-5 rounded-2xl mt-2" />;
		</main>
	);
};
