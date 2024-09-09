import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	container: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '60rem',
		backgroundColor: theme.palette.background.paper,
		padding: '2rem',
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridGap: '3rem',
	},

	postButton: {
		justifySelf: 'start',
	},
}));
