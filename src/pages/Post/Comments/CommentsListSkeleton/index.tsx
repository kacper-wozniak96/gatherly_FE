import { Skeleton } from '@/components/ui/skeleton';

export const CommentsListSkeleton = () => {
	return (
		<main className="mt-5">
			<Skeleton className="h-8 mx-5 rounded-2xl mt-5" />
			<Skeleton className="h-8 mx-5 rounded-2xl mt-5" />
			<Skeleton className="h-8 mx-5 rounded-2xl mt-5" />
		</main>
	);
};
