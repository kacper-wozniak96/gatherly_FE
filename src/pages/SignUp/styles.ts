import { SignUp } from './index';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	container: {
		width: '100vw',
		height: '100vh',
		backgroundColor: theme.palette.customBackground?.main,
	},

	card: {
		width: '120rem',
		height: '60rem',
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
	},

	image: {
		backgroundImage: 'url("src/assets/home.jpg")',
		backgroundPosition: 'center center',
		backgroundSize: '100%',
		backgroundRepeat: 'no-repeat',
		// width: '100%',
		flexBasis: '60%',
	},

	fieldsWrapper: {
		padding: '2rem 2rem',
		flexGrow: 1,
	},

	title: {
		fontWeight: 'bold',
		marginTop: '4rem',
	},

	subTitle: {
		color: theme.palette.text.secondary,
		marginTop: '0.5rem',
		fontWeight: '500',
	},

	hasAccountWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	hasAccountText: {
		marginRight: '0.5rem',
		color: theme.palette.text.secondary,
	},

	hasAccountButton: {
		fontWeight: 'bold',
		fontSize: '1rem',
	},

	inputWrapper: {
		marginTop: '4rem',
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridGap: '2rem',
	},

	SignUpButton: {
		marginTop: '3rem',
		width: '100%',
		fontSize: '1.5rem',
	},
}));
