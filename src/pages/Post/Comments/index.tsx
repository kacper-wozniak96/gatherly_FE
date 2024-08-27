import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useParams } from 'react-router-dom';
import { CustomPagination } from '../Pagination';

export interface GetCommentsResponseDTO {
	comments: CommentDTO[];
	commentsTotalCount: number;
}

export const Comments = () => {
	const { id } = useParams<{ id: string }>();
	const [selectedPage, setSelectedPage] = useState(1);

	const offset = useMemo(() => (selectedPage - 1) * 5, [selectedPage]);

	const { isPending, isError, data, error, isLoading } = useQuery({
		queryKey: [ReactQueryKeys.fetchComments, id, selectedPage],
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
			{data?.comments?.map((comment) => (
				<div className="my-8">
					<div className="flex items-center my-1">
						<Avatar className="w-8 h-8 mr-2">
							<AvatarImage src={comment?.user?.avatarSignedURL ?? ''} alt="@shadcn" />
							<AvatarFallback className="text-xl">
								{getFirstLetterOfUsername(comment?.user as UserDTO)}
							</AvatarFallback>
						</Avatar>
						<span className="font-light">{comment.user.username}</span>
					</div>
					<span>{comment.text}</span>
					<Separator />
				</div>
			))}
			<CustomPagination
				listCount={data.commentsTotalCount}
				offset={5}
				handlePageChange={handlePageChange}
				selectedPage={selectedPage}
			/>
		</div>
	);
};
