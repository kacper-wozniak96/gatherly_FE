import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { CommentDTO } from '@/types/post';
import { UserDTO } from '@/types/user';
import { getFirstLetterOfUsername } from '@/utils/getFirstLetterOfUsername';
import { Separator } from '@radix-ui/react-separator';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { CustomPagination } from '../../../components/CustomPagination';
import { Comment } from './Comment';

export interface GetCommentsResponseDTO {
	comments: CommentDTO[];
	commentsTotalCount: number;
}

export const Comments = () => {
	const { id } = useParams<{ id: string }>();
	const [selectedPage, setSelectedPage] = useState(1);

	const offset = useMemo(() => (selectedPage - 1) * 5, [selectedPage]);

	const { isPending, isError, data, error, isLoading } = useQuery({
		queryKey: [ReactQueryKeys.fetchComments, id, offset],
		queryFn: async () => {
			const response: AxiosResponse<GetCommentsResponseDTO> = await appAxiosInstance.get(
				ApiPostRoutes.getComments(Number(id), offset)
			);

			return response.data;
		},
	});

	const handlePageChange = (page: number) => {
		setSelectedPage(page);
	};

	if (isLoading || !data) {
		return <div>Loading...</div>;
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
