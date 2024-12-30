import { useQuery } from '@tanstack/react-query';
import { PostBreadcrumbs } from '../Breadcrumbs';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { UserDTO } from '@/types/user';
import { Separator } from '@radix-ui/react-separator';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useCallback, useState } from 'react';
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
			const response: AxiosResponse<UserDTO[]> = await appAxiosInstance.get(ApiPostRoutes.getUsers);
			const users = response.data;

			return users;
		},
	});

	const bansQuery = useQuery({
		queryKey: [ReactQueryKeys.fetchPostUserBans, selectedUser?.id],
		queryFn: async () => {
			const response: AxiosResponse<PostUserBanDTO[]> = await appAxiosInstance.get(
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
							<ChevronsUpDown className="opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
							<CommandInput
								placeholder="Search user ..."
								onValueChange={(val) => debouncedInputChange(val)}
							/>
							<CommandList>
								<CommandEmpty>No users found.</CommandEmpty>
								<CommandGroup>
									{users.map((user) => (
										<CommandItem
											key={user.id}
											value={String(user.id)}
											onSelect={(currentValue) => {
												setSelectedUser(users.find((u) => u.id === Number(currentValue)));
												setOpen(false);
											}}
										>
											{user.username}
										</CommandItem>
									))}
								</CommandGroup>
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
