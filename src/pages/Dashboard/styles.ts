import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: theme.palette.customBackground.main,
		minHeight: '100vh',
	},

	innerContainer: {
		width: '60rem',
	},
}));
