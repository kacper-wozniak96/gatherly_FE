// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePostDTO } from '../../../../types/post';

export const postSlice = createApi({
	reducerPath: 'post',

	baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/post' }),

	endpoints: (builder) => ({
		createPost: builder.mutation({
			query: (createPostDTO: CreatePostDTO) => ({
				url: '',
				method: 'POST',
				body: createPostDTO,
			}),
		}),
	}),
});

export const { useCreatePostMutation } = postSlice;
