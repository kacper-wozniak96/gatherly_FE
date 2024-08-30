import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
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
		<div className="basis-1/2 flex items-center">
			<FaSearch className="bg-amber-500 text-white h-11 w-11 p-2 rounded-md mr-2 text-xl" />
			<form className='grow' onSubmit={handleSubmit((data) => onSubmit(data))}>
				<Input {...register('search')} placeholder="Search post" />
			</form>
		</div>
	);
};
