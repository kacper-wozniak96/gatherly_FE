import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CreateUserRequestDTO } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUpFormSchema, SignUpFormValues } from './utils/formSchema';

export const SignUp = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
	});

	const { mutateAsync: signUpUserMutation } = useMutation({
		mutationFn: async (data: SignUpFormValues) => {
			try {
				const dto: CreateUserRequestDTO = data;

				await appAxiosInstance.post(ApiUserRoutes.createUser, dto);
				enqueueSnackbar('Account has been created', { variant: 'success' });
				navigate(AppRoutes.toSignIn);
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	const handleNavigateToSignIn = () => {
		navigate(AppRoutes.toSignIn);
	};

	return (
		<div className="w-screen h-screen bg-emerald-50">
			<Card className="w-[120rem] h-[60rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
				<div className='bg-[url("/src/assets/home.jpg")] bg-center bg-[length:100%] bg-no-repeat basis-[60%]' />
				<div className="p-8 flex-grow">
					<div className="flex justify-end items-center">
						<h5 className="mr-2 text-gray-500 text-xl">Already have an account?</h5>
						<Button className="text-xl p-6" onClick={handleNavigateToSignIn}>
							Sign in
						</Button>
					</div>
					<h3 className="font-bold mt-16 text-5xl">Join Gatherly!</h3>
					<h5 className="text-gray-500 mt-2 text-2xl">Create your account</h5>

					<form className="my-10 grid gap-10" onSubmit={handleSubmit((data) => signUpUserMutation(data))}>
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
						<div>
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								{...register('confirmPassword')}
								type="password"
								id="confirmPassword"
								placeholder=""
								errorMessage={errors.confirmPassword?.message}
							/>
						</div>
						<Button type="submit" className="text-2xl p-8">
							Sign up
						</Button>
					</form>
				</div>
			</Card>
		</div>
	);
};
