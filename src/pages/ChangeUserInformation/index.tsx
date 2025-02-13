import { Separator } from '@/components/ui/separator';
import { appAxiosInstance } from '@/services/api/axios,';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { localStorageUserIdKey } from '@/utils/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { UserDTO } from 'gatherly-types';
import { BasicUserInformation } from './BasicUserInformation';
import { ChangeUserPasswordForm } from './UserPassword';

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

	return (
		<div className="my-6 grid gap-16">
			<BasicUserInformation user={user} />
			<Separator className="h-0.5 bg-gray-400" />
			<ChangeUserPasswordForm user={user} />
		</div>
	);
};
