import { AppRoutes } from '@/components/routes/AppRoutes';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function PostBreadcrumbs() {
	const { pathname } = useLocation();
	const { id } = useParams();

	const isPost = useMemo(() => pathname.includes('/post'), [pathname]);
	const isPostSettings = useMemo(() => isPost && pathname.includes('/settings'), [pathname, isPost]);

	return (
		<div className="my-5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href={AppRoutes.toDashboard} className="text-xl">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
					{isPost && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href={AppRoutes.redirectToPost(Number(id))} className="text-xl">
									Post
								</BreadcrumbLink>
							</BreadcrumbItem>
						</>
					)}
					{isPostSettings && (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage className="text-xl">Settings</BreadcrumbPage>
							</BreadcrumbItem>
						</>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
