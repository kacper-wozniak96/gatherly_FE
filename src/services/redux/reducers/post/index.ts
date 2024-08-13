// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePostDTO, IPost } from '../../../../types/post';
import Cookies from 'js-cookie';

const customBaseQuery = (baseUrl: string) => {
	return fetchBaseQuery({
		baseUrl: baseUrl,
		headers: {
			Authorization: `Bearer ${Cookies.get('accessToken')}`,
		},
	});
};

export const postSlice = createApi({
	reducerPath: 'post',

	// baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/post' }),
	baseQuery: customBaseQuery('http://127.0.0.1:3000/post'),
	// baseQuery: fetchBaseQuery({
	// 	baseUrl: 'http://127.0.0.1:3000/post',
	// 	headers: {
	// 		Authorization: `Bearer ${Cookies.get('accessToken')}`,
	// 	},
	// }),

	endpoints: (builder) => ({
		getPosts: builder.query<IPost[], void>({
			query: () => '',
		}),

		createPost: builder.mutation({
			query: (createPostDTO: CreatePostDTO) => ({
				url: '',
				method: 'POST',
				body: createPostDTO,
			}),
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				queryFulfilled.then(() => {
					dispatch(postSlice.endpoints.getPosts.initiate());
				});
			},
		}),
	}),
});

export const { useCreatePostMutation, useGetPostsQuery } = postSlice;
