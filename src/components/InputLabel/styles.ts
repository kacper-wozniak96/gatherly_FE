import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
	},

	label: {
		marginBottom: '0.5rem',
	},

	starIcon: {
		fontSize: '1rem',
		alignSelf: 'flex-start',
		color: 'red',
	},
}));
