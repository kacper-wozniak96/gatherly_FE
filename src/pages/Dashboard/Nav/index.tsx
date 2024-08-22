import { CreateNewPost } from './CreateNewPost';
import { Menu } from './Menu';
import { useStyles } from './styles';

export const Nav = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.container}>
			<div />
			<div className={classes.rightInnerWrapper}>
				<CreateNewPost />
				<Menu />
			</div>
		</div>
	);
};
