import { useQuery } from '@tanstack/react-query';
import { PostBreadcrumbs } from '../Breadcrumbs';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { AxiosResponse } from 'axios';
import { PostBanDTO, UserDTO } from 'gatherly-types';
import { debounce } from 'lodash';
import { ChevronsDown } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bans } from './Bans';

export const PostSettings = () => {
	const { id } = useParams();

	const [inputValue, setInputValue] = useState<string>('');

	const [open, setOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserDTO | undefined>(undefined);

	const debouncedInputChange = useCallback(
		debounce(async (input: string) => {
			setInputValue(input);
		}, 300),
		[]
	);

	const {
		isPending,
		isError,
		data: users = [],
		error,
		isLoading: isLoadingUsers,
	} = useQuery({
		queryKey: [ReactQueryKeys.fetchUsers, inputValue],
		queryFn: async () => {
			const response: AxiosResponse<UserDTO[]> = await appAxiosInstance.get(ApiUserRoutes.getUsers(inputValue));
			const users = response.data;

			return users;
		},
	});

	const bansQuery = useQuery({
		queryKey: [ReactQueryKeys.fetchPostUserBans, selectedUser?.id],
		queryFn: async () => {
			const response: AxiosResponse<PostBanDTO[]> = await appAxiosInstance.get(
				ApiPostRoutes.getPostUserBans(Number(id), Number(selectedUser?.id))
			);
			const postBansForUser = response.data;

			return postBansForUser;
		},
		enabled: !!selectedUser?.id,
	});

	return (
		<div>
			<PostBreadcrumbs />
			<h1 className="text-2xl font-bold">Post permissions</h1>
			<div className="my-5">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="w-[200px] justify-between text-xl"
						>
							{selectedUser?.username || 'Select a user ...'}
							<ChevronsDown className="opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search user ..."
								onValueChange={(val) => debouncedInputChange(val)}
								className="text-xl"
							/>
							<CommandList>
								{users.map((user) => (
									<button
										key={user.id}
										onClick={() => {
											setSelectedUser(user);
											setOpen(false);
										}}
										className="text-xl text-left w-full p-2"
									>
										{user.username}
									</button>
								))}
								<CommandGroup></CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
				{bansQuery?.data && selectedUser?.id && (
					<Bans userId={Number(selectedUser.id)} postUserBans={bansQuery.data} />
				)}
			</div>
		</div>
	);
};
