import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleFormError } from '@/hooks/useHandleError';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { LoginUserResponseDTO } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const signInFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleFormError } = useHandleFormError();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInFormSchema),
	});

	const { mutateAsync: signInUserMutation } = useMutation({
		mutationFn: async (data: SignInFormValues) => {
			try {
				const response: AxiosResponse<LoginUserResponseDTO> = await axios.post(ApiUserRoutes.login, data);
				const accessToken = response.data.accessToken;
				Cookies.set('accessToken', accessToken);
				navigate(AppRoutes.toDashboard);
				enqueueSnackbar('Successfully signed in', { variant: 'success' });
			} catch (error) {
				handleFormError(error, setError);
			}
		},
	});

	const handleNavigateToSignUp = () => {
		navigate(AppRoutes.toSignUp);
	};

	return (
		<div className="w-screen h-screen bg-emerald-50">
			<Card className="w-[120rem] h-[60rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
				<div className='bg-[url("/src/assets/home.jpg")] bg-center bg-[length:100%] bg-no-repeat basis-[60%]' />
				<div className="p-8 flex-grow">
					<div className="flex justify-end items-center">
						<h5 className="mr-2 text-gray-500 text-xl">Don't have an account?</h5>
						<Button className="text-xl p-6" onClick={handleNavigateToSignUp}>
							Sign up
						</Button>
					</div>
					<h3 className="font-bold mt-16 text-5xl">Welcome to Gatherly!</h3>
					<h5 className="text-gray-500 mt-2 text-2xl">Login to your account</h5>

					<form className="my-10 grid gap-10" onSubmit={handleSubmit((data) => signInUserMutation(data))}>
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
				</div>
			</Card>
		</div>
	);
};
