import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	popoverContainer: {
		display: 'flex',
		flexDirection: 'column',
	},

	menuIcon: {
		fontSize: '2.5rem',
		color: 'black',
	},

	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	icon: {
		marginRight: '0.5rem',
		fontSize: '2rem',
	},

	buttonText: {
		fontSize: '1.2rem',
		fontWeight: 500,
	},
}));
