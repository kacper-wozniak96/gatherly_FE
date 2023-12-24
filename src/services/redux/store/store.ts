import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/user';

export default configureStore({
	reducer: {
		user: userSlice.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSlice.middleware),
});
