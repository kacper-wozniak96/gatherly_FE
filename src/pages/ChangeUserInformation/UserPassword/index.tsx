import { AppRoutes } from '@/components/routes/AppRoutes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { localStorageUserIdKey } from '@/utils/localStorageKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { avatarFileKeyOnUserUpdate, UpdateUserRequestDTO, UserDTO, usernameKeyOnUserUpdate } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { formSchema, FormTypes, Props } from './types';

export const ChangeUserPasswordForm = ({ user }: Props) => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<FormTypes>({
		resolver: zodResolver(formSchema),
	});

	const { mutateAsync: updateUserMutation } = useMutation({
		mutationFn: async (data: FormTypes) => {
			try {
				const dto: UpdateUserRequestDTO = {
					password: data.password,
					confirmPassword: data.confirmPassword,
				};

				const storedUserId = Number(localStorage.getItem(localStorageUserIdKey));
				await appAxiosInstance.post(ApiUserRoutes.updateUser(storedUserId), dto);

				enqueueSnackbar('Successfully updated user password', { variant: 'success' });
				reset();
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	return (
		<div>
			<h2 className="text-2xl font-semibold">User password</h2>
			<form className="my-12 grid gap-5" onSubmit={handleSubmit((data) => updateUserMutation(data))}>
				<div>
					<Label htmlFor="password">New password</Label>
					<Input
						{...register('password')}
						id="password"
						placeholder=""
						errorMessage={errors?.password?.message}
						type="password"
					/>
				</div>
				<div>
					<Label htmlFor="confirmPassword">Confirm password</Label>
					<Input
						{...register('confirmPassword')}
						id="confirmPassword"
						placeholder=""
						errorMessage={errors?.confirmPassword?.message}
						type="password"
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
		</div>
	);
};
