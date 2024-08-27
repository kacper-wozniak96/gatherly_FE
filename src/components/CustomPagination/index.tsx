import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
	listCount: number;
	offset: number;
	handlePageChange: (page: number) => void;
	selectedPage: number;
}

export function CustomPagination({ listCount, offset, handlePageChange, selectedPage }: Props) {
	const numberOfPages = Math.ceil(listCount / offset);

	const isLastPage = selectedPage === numberOfPages;
	const isFirstPage = selectedPage === 1;

	if (numberOfPages === 1 || !listCount) return null;

	return (
		<Pagination>
			<PaginationContent>
				{!isFirstPage && (
					<PaginationItem onClick={() => handlePageChange(selectedPage - 1)}>
						<PaginationPrevious href="#" />
					</PaginationItem>
				)}
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
				{!isLastPage && (
					<PaginationItem onClick={() => handlePageChange(selectedPage + 1)}>
						<PaginationNext href="#" />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
