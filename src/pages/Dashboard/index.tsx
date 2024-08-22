import { Separator } from '@/components/ui/separator';
import { Nav } from './Nav';
import { PostsList } from './PostsList';

export const Dashboard = () => {
	return (
		<div className="flex flex-col items-center w-screen h-screen bg-slate-200">
			<div className="w-[60rem]">
				<Nav />
				<Separator className="bg-slate-300" />
				<PostsList />
			</div>
		</div>
	);
};
