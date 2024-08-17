import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import theme from './services/providers/mui/theme';
import store from './services/redux/store/store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</ThemeProvider>
			</Provider>
		</SnackbarProvider>
	</React.StrictMode>
);
