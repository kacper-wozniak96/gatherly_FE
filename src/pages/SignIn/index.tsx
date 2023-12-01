import { Button, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { EInputType, Input } from '../../components/Input';
import { useCreateUserMutation, useLoginUserMutation } from '../../services/redux/reducers/user';
import { LoginUserDTO, LoginUserResponseDTO } from '../../types/user';
import { useStyles } from './styles';
import { initialFormState } from './utils/initialFormState';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

export const SignIn = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [formState, setFormState] = useState<LoginUserDTO>(initialFormState);

	const [loginUser, { isLoading }] = useLoginUserMutation();

	const handleFormChange = (inputName: keyof LoginUserDTO, value: string) => {
		setFormState((prevState) => ({
			...prevState,
			[inputName]: value,
		}));
	};

	const handleSignIn = async () => {
		try {
			const { accessToken } = await loginUser(formState).unwrap();
			Cookies.set('accessToken', accessToken);
			navigate('/home');
		} catch (error) {
			console.log(error);
		}
	};

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
						<Button
							variant="contained"
							className={classes.hasAccountButton}
							onClick={handleNavigateToSignUp}
						>
							Sign Up
						</Button>
					</div>
					<Typography variant="h3" className={classes.title}>
						Welcome to Gatherly!
					</Typography>
					<Typography className={classes.subTitle} variant="h5">
						Login to your account
					</Typography>

					<div className={classes.inputWrapper}>
						<Input<keyof LoginUserDTO>
							label="Username"
							isRequired
							value={formState.username}
							onChange={handleFormChange}
							inputName="username"
						/>
						<Input<keyof LoginUserDTO>
							label="Password"
							type={EInputType.PASSWORD}
							isRequired
							value={formState.password}
							inputName="password"
							onChange={handleFormChange}
						/>
					</div>
					<Button
						className={classes.SignUpButton}
						variant="contained"
						size="large"
						onClick={handleSignIn}
						disabled={isLoading}
					>
						Sign in
					</Button>
				</div>
			</Card>
		</div>
	);
};
