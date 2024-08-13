import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/user';
import { postSlice } from '../reducers/post';

export default configureStore({
	reducer: {
		user: userSlice.reducer,
		post: postSlice.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSlice.middleware, postSlice.middleware),
});
