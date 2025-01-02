import { CreateNewPost } from './CreateNewPost';
import { Logout } from './Menu';
import { SearchPost } from './SearchPost';

export const DashboardHeader = () => {
	return (
		<div className="flex items-center justify-between py-5">
			<SearchPost />
			<div>
				<CreateNewPost />
				<Logout />
			</div>
		</div>
	);
};
