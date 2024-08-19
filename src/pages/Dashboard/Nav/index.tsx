import { CreateNewPost } from './CreateNewPost';
import { UserAvatar } from './UserAvatar';
import { useStyles } from './styles';

export const Nav = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.container}>
			<div />
			<div className={classes.rightInnerWrapper}>
				<CreateNewPost />
				<UserAvatar />
			</div>
		</div>
	);
};
