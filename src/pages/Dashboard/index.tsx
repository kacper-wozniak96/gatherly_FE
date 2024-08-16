import { Divider } from '@mui/material';
import { Nav } from './Nav';
import { useStyles } from './styles';

export const Dashboard = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.innerContainer}>
				<Nav />
				<Divider />
			</div>
		</div>
	);
};
