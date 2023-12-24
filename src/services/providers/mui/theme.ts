import { PaletteColor, PaletteColorOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		customBackground: PaletteColor;
	}
	interface PaletteOptions {
		customBackground: PaletteColorOptions;
	}
}

const theme = createTheme({
	palette: {
		customBackground: {
			main: '#edf6ff',
		},
	},
});

export default theme;
