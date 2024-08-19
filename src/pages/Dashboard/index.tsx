import { Separator } from '@/components/ui/separator';
import { Divider } from '@mui/material';
import { Nav } from './Nav';
import { PostsList } from './PostsList';
import { useStyles } from './styles';

export const Dashboard = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.innerContainer}>
				<Nav />
				<Separator />
				{/* <Divider /> */}
				<PostsList />
			</div>
		</div>
	);
};
