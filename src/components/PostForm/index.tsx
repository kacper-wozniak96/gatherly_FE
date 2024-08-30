import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PostFormProps {
	onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
	register: UseFormRegister<{
		title: string;
		text: string;
	}>;
	errors: FieldErrors<{
		title: string;
		text: string;
	}>;
}

export const PostForm = ({ register, onSubmit, errors }: PostFormProps) => {
	return (
		<form onSubmit={onSubmit}>
			<div className="my-5">
				<Label htmlFor="title" className="" isRequired>
					Post Title
				</Label>
				<Input {...register('title')} id="title" className="" errorMessage={errors.title?.message} />
			</div>
			<div className="my-10">
				<Label htmlFor="text" className="">
					Post Description
				</Label>
				<Textarea {...register('text')} id="text" placeholder="Type your post description" />
			</div>
			<Button type="submit">Save changes</Button>
		</form>
	);
};
