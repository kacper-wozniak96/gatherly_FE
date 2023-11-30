import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
	},

	input: {
		width: '100%',

		'& input': {
			padding: '1rem 0.5rem',
			fontSize: '1.5rem',
		},
	},
}));
