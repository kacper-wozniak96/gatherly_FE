import { appAxiosInstance } from '@/services/api/axios,';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { localStorageUserIdKey } from '@/utils/localStorageUserIdKey';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { UserDTO } from 'gatherly-types';
import { Form } from './Form';

export const ChangeUserInformation = () => {
	const {
		isPending,
		isError,
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: [ReactQueryKeys.fetchUser],
		queryFn: async () => {
			const storedUserId = localStorage.getItem(localStorageUserIdKey);
			const response: AxiosResponse<UserDTO> = await appAxiosInstance.get(
				ApiUserRoutes.getUser(Number(storedUserId))
			);
			const user = response.data;

			return user;
		},
	});

	if (isLoading || !user) {
		return <div>Loading...</div>;
	}

	return <Form user={user} />;
};
