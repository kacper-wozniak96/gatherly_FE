import { useQuery } from '@tanstack/react-query';
import { PostBreadcrumbs } from '../Breadcrumbs';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { UserDTO } from '@/types/user';
import { Separator } from '@radix-ui/react-separator';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bans, EBanType } from './Bans';

export interface PostUserBanDTO {
	id: number;
	type: EBanType;
	userId: number;
	postId: number;
}

export const PostSettings = () => {
	const { id } = useParams();

	const [selectedUserId, setSelectedUserId] = useState<string>('');

	const {
		isPending,
		isError,
		data: users,
		error,
		isLoading,
	} = useQuery({
		queryKey: [ReactQueryKeys.fetchUsers],
		queryFn: async () => {
			const response: AxiosResponse<UserDTO[]> = await appAxiosInstance.get(ApiPostRoutes.getUsers);
			const users = response.data;

			return users;
		},
	});

	const bansQuery = useQuery({
		queryKey: [ReactQueryKeys.fetchPostUserBans, selectedUserId],
		queryFn: async () => {
			const response: AxiosResponse<PostUserBanDTO[]> = await appAxiosInstance.get(
				ApiPostRoutes.getPostUserBans(Number(id), Number(selectedUserId))
			);
			const postBansForUser = response.data;

			return postBansForUser;
		},
		enabled: !!selectedUserId,
	});

	console.log({ selectedUserId, data: bansQuery.data });

	return (
		<div>
			<PostBreadcrumbs />
			<h1 className="text-2xl font-bold">Post permissions</h1>
			<div className="my-5">
				<Label>User</Label>
				<Select onValueChange={(val) => setSelectedUserId(val)}>
					<SelectTrigger className="w-[180px] text-xl">
						<SelectValue placeholder="Select a user" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{users?.map((user) => (
								<SelectItem key={user.id} value={String(user.id)} className="text-xl">
									{user.username}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{bansQuery?.data && selectedUserId && (
					<Bans userId={Number(selectedUserId)} postUserBans={bansQuery.data} />
				)}
			</div>
		</div>
	);
};
