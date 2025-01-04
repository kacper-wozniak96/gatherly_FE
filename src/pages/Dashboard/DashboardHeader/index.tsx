import { CreateNewPost } from './CreateNewPost';
import { SearchPost } from './SearchPost';

export const DashboardHeader = () => {
	return (
		<div className="flex items-center justify-between py-5">
			<SearchPost />
			<CreateNewPost />
		</div>
	);
};
