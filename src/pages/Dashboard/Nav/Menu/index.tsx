import { AppRoutes } from '@/components/routes/AppRoutes';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

import { GrMenu } from 'react-icons/gr';
import { Link } from 'react-router-dom';

export const Menu = () => {
	return (
		<Menubar className="bg-transparent border-0">
			<MenubarMenu>
				<MenubarTrigger>
					<GrMenu className="cursor-pointer text-3xl font-medium text-black" />
				</MenubarTrigger>
				<MenubarContent>
					<Link to={AppRoutes.toProfile}>
						<MenubarItem className="cursor-pointer text-xl">Edit profile</MenubarItem>
					</Link>
					<MenubarItem className="cursor-pointer text-xl">Logout</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
