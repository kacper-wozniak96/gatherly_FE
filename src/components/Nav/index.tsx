import { BiSolidReport } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';
import { IoMdSettings } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes';
import { Button } from '../ui/button';

export const Nav = () => {
	const location = useLocation();

	return (
		<div className="flex flex-col justify-between items-center my-28 h-96">
			<div className="grid grid-cols-1 gap-y-10">
				<a
					href={AppRoutes.toDashboard}
					className={`flex items-center p-5 ${
						location.pathname.includes(AppRoutes.toDashboard)
							? 'bg-blue-500 text-white rounded-xl'
							: 'text-gray-500'
					}`}
				>
					<MdSpaceDashboard className="text-4xl mr-4" />
					<span className="text-2xl">Dashboard</span>
				</a>
				<a
					href={AppRoutes.toGenerateActivityReports}
					className={`flex items-center p-5 ${
						location.pathname === AppRoutes.toGenerateActivityReports
							? 'bg-blue-500 text-white rounded-xl'
							: 'text-gray-500'
					}`}
				>
					<BiSolidReport className="text-4xl mr-4" />
					<span className="text-2xl">User report</span>
				</a>
				<a
					href={AppRoutes.toChangeUserInformation}
					className={`flex items-center p-5 ${
						location.pathname === AppRoutes.toChangeUserInformation
							? 'bg-blue-500 text-white rounded-xl'
							: 'text-gray-500'
					}`}
				>
					<IoMdSettings className="text-4xl mr-4" />
					<span className="text-2xl">Settings</span>
				</a>
			</div>
		</div>
	);
};
