import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '2rem 0',
	},

	rightInnerWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
}));
