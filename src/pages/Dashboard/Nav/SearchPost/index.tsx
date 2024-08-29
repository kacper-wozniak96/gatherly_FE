import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DashboardContext } from '../..';

const searchPostSchema = z.object({
	search: z.string(),
});

type SearchPostFormValues = z.infer<typeof searchPostSchema>;

export const SearchPost = () => {
	const { handleSearch } = useContext(DashboardContext);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<SearchPostFormValues>({
		resolver: zodResolver(searchPostSchema),
	});

	const onSubmit = (data: SearchPostFormValues) => {
		handleSearch(data.search);
	};

	return (
		<form className="basis-1/2" onSubmit={handleSubmit((data) => onSubmit(data))}>
			<Input {...register('search')} placeholder="Search post" />
		</form>
	);
};
