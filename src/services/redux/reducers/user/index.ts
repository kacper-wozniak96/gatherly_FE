// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUserDTO, LoginUserDTO, LoginUserResponseDTO } from '../../../../types/user';

export const userSlice = createApi({
	reducerPath: 'user',

	baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000/user' }),

	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (createUserDTO: CreateUserDTO) => ({
				url: '',
				method: 'POST',
				body: createUserDTO,
			}),
		}),

		loginUser: builder.mutation<LoginUserResponseDTO, LoginUserDTO>({
			query: (loginUserDTO: LoginUserDTO) => ({
				url: '/login',
				method: 'POST',
				body: loginUserDTO,
			}),
		}),
	}),
});

export const { useCreateUserMutation, useLoginUserMutation } = userSlice;
