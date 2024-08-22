import { AppRoutes } from '@/components/routes/AppRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { UserDTO } from '@/types/user';
import { userIdKey } from '@/utils/accessToken';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
	username: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const ChangeUserInformation = () => {
	const queryClient = useQueryClient();

	const {
		isPending,
		isError,
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: ReactQueryKeys.fetchUser,
		queryFn: async () => {
			const storedUserId = localStorage.getItem(userIdKey);
			const response: AxiosResponse<UserDTO> = await appAxiosInstance.get(
				ApiPostRoutes.getUser(Number(storedUserId))
			);
			const user = response.data;
			setValue('username', user.username);
			return user;
		},
	});

	const { register, setValue, handleSubmit } = useForm<FormValues>({
		defaultValues: user
			? {
					username: user.username,
			  }
			: undefined,
		resolver: zodResolver(formSchema),
	});

	const { mutateAsync: updateUserMutation } = useMutation({
		mutationFn: async (data: FormValues) => {
			try {
				const storedUserId = Number(localStorage.getItem(userIdKey));
				if (!Number.isInteger(storedUserId)) return;
				await appAxiosInstance.patch(ApiPostRoutes.updateUser(storedUserId), data);
			} catch (error) {}
		},
	});

	return (
		<div className="flex flex-col items-center w-screen h-screen bg-slate-200">
			<div className="w-[60rem] my-5">
				<h1 className="text-2xl font-bold">User profile edit</h1>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<form className="my-3" onSubmit={handleSubmit((data) => updateUserMutation(data))}>
					<Label htmlFor="username">Username</Label>
					<Input {...register('username')} id="username" placeholder="Username" />
					<div className="my-4">
						<Button className="text-xl" type="submit">
							Update
						</Button>
						<Link to={AppRoutes.toDashboard}>
							<Button className="ml-2 text-xl" variant="outline">
								Cancel
							</Button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
