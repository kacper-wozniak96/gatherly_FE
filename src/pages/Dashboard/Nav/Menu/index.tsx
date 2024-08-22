import { AppRoutes } from '@/components/routes/AppRoutes';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { accessTokenKey } from '@/utils/accessToken';
import Cookies from 'js-cookie';

import { GrMenu } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';

export const Menu = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate(AppRoutes.toSignIn);
		Cookies.remove(accessTokenKey);
	};

	return (
		<Menubar className="bg-transparent border-0">
			<MenubarMenu>
				<MenubarTrigger>
					<GrMenu className="cursor-pointer text-3xl font-medium text-black" />
				</MenubarTrigger>
				<MenubarContent>
					<MenubarSub>
						<MenubarSubTrigger className="cursor-pointer text-xl">User</MenubarSubTrigger>
						<MenubarSubContent>
							<Link to={AppRoutes.toChangeUserInformation}>
								<MenubarItem className="cursor-pointer text-xl">Change user information</MenubarItem>
							</Link>
							<Link to={AppRoutes.toChangePassword}>
								<MenubarItem className="cursor-pointer text-xl">Change password</MenubarItem>
							</Link>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarItem className="cursor-pointer text-xl" onClick={handleLogout}>
						Logout
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
