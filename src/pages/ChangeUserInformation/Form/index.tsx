import { AppRoutes } from '@/components/routes/AppRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { localStorageUserIdKey } from '@/utils/localStorageUserIdKey';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { avatarFileKeyOnUserUpdate, UserDTO, usernameKeyOnUserUpdate } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { formSchema, FormTypes, Props } from './types';

export const Form = ({ user }: Props) => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

	const [fileUrl, setFileUrl] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, touchedFields, dirtyFields },
	} = useForm<FormTypes>({
		defaultValues: {
			username: user.username,
		},
		resolver: zodResolver(formSchema),
	});

	const { mutateAsync: updateUserMutation } = useMutation({
		mutationFn: async (data: FormTypes) => {
			try {
				const formData = new FormData();

				if (touchedFields?.avatar) formData.append(avatarFileKeyOnUserUpdate, data?.avatar[0]);
				if (dirtyFields?.username) formData.append(usernameKeyOnUserUpdate, data?.username);

				const storedUserId = Number(localStorage.getItem(localStorageUserIdKey));
				await appAxiosInstance.post(ApiUserRoutes.updateUser(storedUserId), formData);

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

	return (
		<form className="my-12 grid gap-5" onSubmit={handleSubmit((data) => updateUserMutation(data))}>
			<div className="flex items-center">
				<Avatar className="w-20 h-20 mr-5">
					<AvatarImage src={fileUrl ?? user?.avatarSignedURL ?? ''} alt="useravatar" />
					<AvatarFallback className="text-4xl">{getFirstLetterOfUsername(user as UserDTO)}</AvatarFallback>
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
	);
};
