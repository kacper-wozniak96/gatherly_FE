import { Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import StarIcon from '@mui/icons-material/Star';

interface InputLabelProps {
	label: string;
	isRequired?: boolean;
}

export const InputLabel = (props: InputLabelProps) => {
	const { label, isRequired } = props;
	const { classes } = useStyles();

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.label} variant="h5">
				{label}
			</Typography>
			{isRequired && <StarIcon className={classes.starIcon} />}
		</div>
	);
};
