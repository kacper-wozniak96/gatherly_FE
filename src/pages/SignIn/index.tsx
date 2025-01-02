import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { localStorageUserIdKey } from '@/utils/accessToken';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { LoginUserRequestDTO, LoginUserResponseDTO } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FaUserSecret } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInFormSchema, SignInFormType } from './types';

export const SignIn = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignInFormType>({
		resolver: zodResolver(signInFormSchema),
	});

	const { mutateAsync: signInUserMutation } = useMutation({
		mutationFn: async (data: SignInFormType) => {
			try {
				const dto: LoginUserRequestDTO = data;

				const response: AxiosResponse<LoginUserResponseDTO> = await appAxiosInstance.post(
					ApiUserRoutes.login,
					dto
				);
				handleLoginSuccess(response);
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	const { mutateAsync: signInAsGuestUserMutation } = useMutation({
		mutationFn: async () => {
			try {
				const dto: LoginUserRequestDTO = {
					username: 'guest',
					password: 'guest',
				};

				const response: AxiosResponse<LoginUserResponseDTO> = await appAxiosInstance.post(
					ApiUserRoutes.login,
					dto
				);
				handleLoginSuccess(response);
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	function handleLoginSuccess(response: AxiosResponse<LoginUserResponseDTO>) {
		const userId = response.data.user.id;
		localStorage.setItem(localStorageUserIdKey, String(userId));
		navigate(AppRoutes.toDashboard);
		enqueueSnackbar('Successfully signed in', { variant: 'success' });
	}

	const handleNavigateToSignUp = () => {
		navigate(AppRoutes.toSignUp);
	};

	return (
		<div className="w-screen h-screen bg-emerald-50">
			<Card className="w-[120rem] h-[60rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
				<div className='bg-[url("/src/assets/home.jpg")] bg-center bg-[length:100%] bg-no-repeat basis-[60%]' />
				<div className="p-8 flex-grow flex flex-col">
					<div className="flex justify-end items-center">
						<h5 className="mr-2 text-gray-500 text-xl">Don't have an account?</h5>
						<Button className="text-xl p-6" onClick={handleNavigateToSignUp}>
							Sign up
						</Button>
					</div>
					<h3 className="font-bold mt-16 text-5xl">Welcome to Gatherly!</h3>
					<h5 className="text-gray-500 mt-2 text-2xl">Login to your account</h5>

					<form className="mt-10 grid gap-10" onSubmit={handleSubmit((data) => signInUserMutation(data))}>
						<div>
							<Label htmlFor="username">Username</Label>
							<Input
								{...register('username')}
								type="text"
								id="username"
								placeholder=""
								errorMessage={errors.username?.message}
							/>
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								{...register('password')}
								type="password"
								id="password"
								placeholder=""
								errorMessage={errors.password?.message}
							/>
						</div>
						<Button type="submit" className="text-2xl p-8">
							Log in
						</Button>
					</form>
					<span className="text-2xl self-center my-3">or</span>
					<Button variant="secondary" className="text-2xl p-8" onClick={() => signInAsGuestUserMutation()}>
						Log in as Guest
						<FaUserSecret className="ml-3 text-4xl" />
					</Button>
				</div>
			</Card>
		</div>
	);
};
