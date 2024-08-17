import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCreatePostMutation } from '../../../../services/redux/reducers/post';
import { CreatePostDTO } from '../../../../types/post';
import { useStyles } from './styles';
import { initialFormState } from './utils/initialFormState';

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
			<Dialog>
				<DialogTrigger asChild>
					<Button>Edit Profile</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Username
							</Label>
							<Input id="username" defaultValue="@peduarte" className="col-span-3" />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
