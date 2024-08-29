import { Input } from '@/components/ui/input';
import { CreateNewPost } from './CreateNewPost';
import { Menu } from './Menu';
import { SearchPost } from './SearchPost';
import { useStyles } from './styles';

export const Nav = () => {
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
