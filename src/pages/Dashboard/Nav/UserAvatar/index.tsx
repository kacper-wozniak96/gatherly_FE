import { Avatar, Button, IconButton, Popover, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const UserAvatar = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleSignOut = () => {
		Cookies.remove('accessToken');
		navigate('/signIn');
	};

	return (
		<div>
			<IconButton onClick={handleClick}>
				<MenuIcon className={classes.menuIcon} />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div className={classes.popoverContainer}>
					<Button className={classes.button}>
						<AccountBoxIcon className={classes.icon} />
						<Typography className={classes.buttonText}>Edit profile</Typography>
					</Button>
					<Button className={classes.button} onClick={handleSignOut}>
						<LogoutIcon className={classes.icon} />
						<Typography className={classes.buttonText}>Sign out</Typography>
					</Button>
				</div>
			</Popover>
		</div>
	);
};
