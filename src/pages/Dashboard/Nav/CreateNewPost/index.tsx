import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useStyles } from './styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '../../../../components/Input';
import { CreatePostDTO } from '../../../../types/post';

export const CreateNewPost = () => {
	const { classes } = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>
				Create new post
			</Button>
			<Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<div className={classes.container}>
					<Typography id="modal-modal-title" variant="h4">
						New Post
					</Typography>
					<Input<keyof CreatePostDTO>
						label="Title"
						onChange={() => {}}
						value=""
						inputName="title"
						isRequired
					/>
					<Input<keyof CreatePostDTO>
						label="Description"
						onChange={() => {}}
						value=""
						inputName="description"
						textFieldProps={{
							multiline: true,
							minRows: 5,
							placeholder: 'Whats on your mind? . . .',
						}}
					/>
					<div>
						<Button variant="contained" size="large" className={classes.postButton}>
							Post
						</Button>
						<Button size="large" onClick={handleClose}>
							Close
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
