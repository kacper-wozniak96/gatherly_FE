import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginUserResponseDTO } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useStyles } from './styles';

const signInFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { enqueueSnackbar } = useSnackbar();

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInFormSchema),
	});

	const { mutateAsync: signInUserMutation } = useMutation({
		mutationFn: async (data: SignInFormValues) => {
			try {
				const response: AxiosResponse<LoginUserResponseDTO> = await axios.post(
					`${import.meta.env.VITE_BACKEND_ADDRESS}/user/login`,
					data
				);
				const accessToken = response.data.accessToken;
				Cookies.set('accessToken', accessToken);
				navigate('/dashboard');
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			enqueueSnackbar('Successfully signed in', { variant: 'success' });
		},
	});

	const handleNavigateToSignUp = () => {
		navigate('/signUp');
	};

	return (
		<div className={classes.container}>
			<Card className={classes.card}>
				<div className={classes.image} />
				<div className={classes.fieldsWrapper}>
					<div className={classes.hasAccountWrapper}>
						<Typography variant="h5" className={classes.hasAccountText}>
							Don't have an account?
						</Typography>
					</div>
					<Typography variant="h3" className={classes.title}>
						Welcome to Gatherly!
					</Typography>
					<Typography className={classes.subTitle} variant="h5">
						Login to your account
					</Typography>

					<form className="my-10 grid gap-10" onSubmit={handleSubmit((data) => signInUserMutation(data))}>
						<div>
							<Label htmlFor="username">Username</Label>
							<Input
								{...register('username')}
								type="text"
								id="username"
								placeholder="username"
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
						<Button type="submit">Submit</Button>
					</form>
				</div>
			</Card>
		</div>
	);
};
