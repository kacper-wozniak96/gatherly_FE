import { Button, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { EInputType, Input } from '../../components/Input';
import { useCreateUserMutation } from '../../services/redux/reducers/user';
import { CreateUserDTO } from '../../types/user';
import { useStyles } from './styles';
import { initialFormState } from './utils/initialFormState';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export const SignUp = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [formState, setFormState] = useState<CreateUserDTO>(initialFormState);

	const [createUser, { isLoading }] = useCreateUserMutation();

	const handleFormChange = (inputName: keyof CreateUserDTO, value: string) => {
		setFormState((prevState) => ({
			...prevState,
			[inputName]: value,
		}));
	};

	const handleSignUp = async () => {
		try {
			await createUser(formState);
			enqueueSnackbar('Account has been created', {
				variant: 'success',
				anchorOrigin: { vertical: 'top', horizontal: 'center' },
			});
			navigate('/sign-in');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes.container}>
			<Card className={classes.card}>
				<div className={classes.image} />
				<div className={classes.fieldsWrapper}>
					<div className={classes.hasAccountWrapper}>
						<Typography variant="h5" className={classes.hasAccountText}>
							Already have an account?
						</Typography>
						<Button variant="contained" className={classes.hasAccountButton}>
							Sign In
						</Button>
					</div>
					<Typography variant="h3" className={classes.title}>
						Welcome to Gatherly!
					</Typography>
					<Typography className={classes.subTitle} variant="h5">
						Register your account
					</Typography>

					<div className={classes.inputWrapper}>
						<Input<keyof CreateUserDTO>
							label="Username"
							isRequired
							value={formState.userName}
							onChange={handleFormChange}
							inputName="userName"
						/>
						<Input<keyof CreateUserDTO>
							label="Password"
							type={EInputType.PASSWORD}
							isRequired
							value={formState.password}
							inputName="password"
							onChange={handleFormChange}
						/>
						<Input<keyof CreateUserDTO>
							label="Confirm password"
							type={EInputType.PASSWORD}
							isRequired
							value={formState.confirmPassword}
							inputName="confirmPassword"
							onChange={handleFormChange}
						/>
					</div>
					<Button
						className={classes.SignUpButton}
						variant="contained"
						size="large"
						onClick={handleSignUp}
						disabled={isLoading}
					>
						Sign up
					</Button>
				</div>
			</Card>
		</div>
	);
};
