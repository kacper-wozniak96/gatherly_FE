import React from 'react';
import { useStyles } from './styles';
import { Nav } from './Nav';
import { Divider } from '@mui/material';

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
