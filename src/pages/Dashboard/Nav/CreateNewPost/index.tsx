import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Input } from '../../../../components/Input';
import { useCreatePostMutation } from '../../../../services/redux/reducers/post';
import { CreatePostDTO } from '../../../../types/post';
import { useStyles } from './styles';
import { initialFormState } from './utils/initialFormState';
import { useSnackbar } from 'notistack';

export const CreateNewPost = () => {
	const { classes } = useStyles();
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState<CreatePostDTO>(initialFormState);
	const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
	const { enqueueSnackbar } = useSnackbar();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setFormState(initialFormState);
	};

	const handleFormChange = (inputName: keyof CreatePostDTO, value: string) => {
		setFormState((prevState) => ({
			...prevState,
			[inputName]: value,
		}));
	};

	const handleCreatePost = async () => {
		try {
			await createPost(formState);
			enqueueSnackbar('Post created successfully', { variant: 'success' });
			handleClose();
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Error creating post', { variant: 'error' });
		}
	};

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
						onChange={handleFormChange}
						value={formState.title}
						inputName="title"
						isRequired
					/>
					<Input<keyof CreatePostDTO>
						label="Description"
						onChange={handleFormChange}
						value={formState.description}
						inputName="description"
						textFieldProps={{
							multiline: true,
							minRows: 5,
							placeholder: 'Whats on your mind? . . .',
						}}
					/>
					<div>
						<Button
							variant="contained"
							size="large"
							className={classes.postButton}
							onClick={handleCreatePost}
							// disabled={isCreatingPost}
						>
							Post
						</Button>
						<Button size="large" onClick={handleClose} disabled={isCreatingPost}>
							Close
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
