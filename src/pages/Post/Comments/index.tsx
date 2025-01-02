import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GetCommentsResponseDTO } from 'gatherly-types';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomPagination } from '../../../components/CustomPagination';
import { Comment } from './Comment';
import { CommentsListSkeleton } from './CommentsListSkeleton';
import { NoComments } from './NoComments';

export const Comments = () => {
	const { id } = useParams<{ id: string }>();
	const [selectedPage, setSelectedPage] = useState(1);

	const { handleError } = useHandleError();

	const offset = useMemo(() => (selectedPage - 1) * 5, [selectedPage]);

	const { isPending, isError, data, error, isLoading } = useQuery({
		queryKey: [ReactQueryKeys.fetchComments, id, offset],
		queryFn: async () => {
			try {
				const response: AxiosResponse<GetCommentsResponseDTO> = await appAxiosInstance.get(
					ApiPostRoutes.getComments(Number(id), offset)
				);

				return response.data;
			} catch (error) {
				handleError(error);
			}
		},
	});

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
	};

	if (isLoading) {
		return <CommentsListSkeleton />;
	}

	if (!data?.comments || !data?.commentsTotalCount) {
		return <NoComments />;
	}

	return (
		<div>
			{data?.comments?.map((comment) => <Comment comment={comment} />)}
			<CustomPagination
				listCount={data.commentsTotalCount}
				offset={5}
				handlePageChange={handlePageChange}
				selectedPage={selectedPage}
			/>
		</div>
	);
};
