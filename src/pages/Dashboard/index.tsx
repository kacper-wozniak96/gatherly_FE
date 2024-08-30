import { Separator } from '@/components/ui/separator';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { PostDTO } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useMemo, useState } from 'react';
import { Nav } from './Nav';
import { GetPostsResponseDTO, PostsList } from './PostsList';

export interface DashboardContextProps {
	handleSearch: (search: string) => void;
	handlePageChange: (page: number) => void;
	posts: PostDTO[] | undefined;
	isLoading: boolean;
	selectedPage: number;
	postsTotalCount: number | undefined;
}

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const Dashboard = () => {
	const [selectedPage, setSelectedPage] = useState(1);
	const [search, setSearch] = useState('');

	const offset = useMemo(() => (selectedPage - 1) * 5, [selectedPage]);

	const { isLoading, data } = useQuery({
		queryKey: [ReactQueryKeys.fetchPosts, offset, search],
		queryFn: async (query) => {
			const response: AxiosResponse<GetPostsResponseDTO> = await appAxiosInstance.get(
				ApiPostRoutes.getPosts(offset, search)
			);
			const data = response.data;

			return data;
		},
	});

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
	};

	const handleSearch = (search: string) => {
		setSearch(search);
	};

	return (
		<DashboardContext.Provider
			value={{
				handleSearch,
				handlePageChange,
				posts: data?.posts,
				isLoading,
				selectedPage,
				postsTotalCount: data?.postsTotalCount,
			}}
		>
			<div className="flex flex-col items-center w-screen h-screen bg-slate-200">
				<div className="w-[60rem]">
					<Nav />
					<Separator className="bg-slate-300" />
					<PostsList />
				</div>
			</div>
		</DashboardContext.Provider>
	);
};
