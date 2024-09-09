import { Input } from '@/components/ui/input';
import { PostBreadcrumbs } from '../../Post/Breadcrumbs';
import { CreateNewPost } from './CreateNewPost';
import { Menu } from './Menu';
import { SearchPost } from './SearchPost';
import { useStyles } from './styles';

export const DashboardHeader = () => {
	const { classes } = useStyles();

	return (
		<div className="flex items-center justify-between py-5">
			<SearchPost />
			<div className={classes.rightInnerWrapper}>
				<CreateNewPost />
				<Menu />
			</div>
		</div>
	);
};
