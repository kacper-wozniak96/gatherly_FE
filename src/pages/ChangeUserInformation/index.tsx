import { AppRoutes } from '@/components/routes/AppRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { UserDTO } from '@/types/user';
import { localStorageUserIdKey } from '@/utils/accessToken';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
	username: z.string(),
	avatar: z
		.instanceof(FileList)
		.optional()
		.default(new DataTransfer().files)
		.refine((files) => files.length === 0 || files[0]?.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
		.refine(
			(files) => files.length === 0 || ['image/jpeg', 'image/png'].includes((files as FileList)[0]?.type),
			'Only JPEG and PNG files are allowed'
		),
});

type FormValues = z.infer<typeof formSchema>;

export const ChangeUserInformation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

	const [fileUrl, setFileUrl] = useState<string | null>(null);

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
				ApiPostRoutes.getUser(Number(storedUserId))
			);
			const user = response.data;
			setValue('username', user.username);
			return user;
		},
	});

	const {
		register,
		setValue,
		handleSubmit,
		setError,
		getValues,
		formState: { errors, touchedFields, dirtyFields },
	} = useForm<FormValues>({
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
				console.log({ dirtyFields, data, touchedFields });
				const formData = new FormData();

				if (touchedFields?.avatar) formData.append('file', data?.avatar[0]);
				if (touchedFields?.username) formData.append('username', data?.username);

				const storedUserId = Number(localStorage.getItem(localStorageUserIdKey));
				if (!Number.isInteger(storedUserId)) return;
				await appAxiosInstance.post(ApiPostRoutes.updateUser(storedUserId), formData);
				navigate(AppRoutes.toDashboard);
				enqueueSnackbar('Successfully updated user information', { variant: 'success' });
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setFileUrl(url);
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<form className="my-12 grid gap-5" onSubmit={handleSubmit((data) => updateUserMutation(data))}>
				<div className="flex items-center">
					<Avatar className="w-20 h-20 mr-5">
						<AvatarImage src={fileUrl ?? user?.avatarSignedURL ?? ''} alt="@shadcn" />
						<AvatarFallback className="text-4xl">
							{getFirstLetterOfUsername(user as UserDTO)}
						</AvatarFallback>
					</Avatar>
					<div className="grow">
						<Label htmlFor="picture">Avatar</Label>
						<Input
							{...register('avatar')}
							id="picture"
							type="file"
							errorMessage={errors?.avatar?.message as any}
							onChange={handleFileChange}
						/>
					</div>
				</div>
				<div>
					<Label htmlFor="username">New username</Label>
					<Input
						{...register('username')}
						id="username"
						placeholder="Username"
						errorMessage={errors?.username?.message}
					/>
				</div>
				<div className="flex justify-end">
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
		</>
	);
};
