import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';

interface Props {
	listCount: number;
	offset: number;
	handlePageChange: (page: number) => void;
	selectedPage: number;
}

export const CustomPagination = ({ listCount, offset, handlePageChange, selectedPage }: Props) => {
	const numberOfPages = Math.ceil(listCount / offset);

	const isLastPage = useMemo(() => selectedPage === numberOfPages, [selectedPage, numberOfPages]);
	const isFirstPage = useMemo(() => selectedPage === 1, [selectedPage]);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem
					onClick={() => handlePageChange(selectedPage - 1)}
					className={`${isFirstPage ? 'pointer-events-none opacity-50' : ''}`}
				>
					<PaginationPrevious href="#" />
				</PaginationItem>

				{Array.apply(null, Array(numberOfPages)).map((x, i) => {
					const pageNumber = i + 1;

					if (pageNumber < selectedPage - 2 || pageNumber > selectedPage + 2) {
						return null;
					}

					return (
						<PaginationItem>
							<PaginationLink
								onClick={() => handlePageChange(pageNumber)}
								href="#"
								isActive={selectedPage === i + 1}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem
					onClick={() => handlePageChange(selectedPage + 1)}
					className={`${isLastPage ? 'pointer-events-none opacity-50' : ''}`}
				>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
