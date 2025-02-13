import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { localStorageAccessTokenKey, localStorageUserIdKey } from '@/utils/localStorageKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { BiSolidReport } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { MdLogout, MdSpaceDashboard } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes';
import { Button } from '../ui/button';

export const Nav = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleError } = useHandleError();
	const queryClient = useQueryClient();

	const { mutateAsync: logout } = useMutation({
		mutationFn: async () => {
			try {
				localStorage.removeItem(localStorageAccessTokenKey);
				localStorage.removeItem(localStorageUserIdKey);
				await appAxiosInstance.post(ApiUserRoutes.userLogout);
				enqueueSnackbar('Logged out successfully', { variant: 'success' });
				navigate(AppRoutes.toSignIn);
				queryClient.clear();
				await queryClient.invalidateQueries();
				await queryClient.resetQueries();
			} catch (error) {
				handleError(error);
			}
		},
	});

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
				<Button
					variant="ghost"
					className="flex justify-start items-center text-gray-500 hover:bg-transparent hover:text-gray-500 my-10"
					onClick={() => logout()}
				>
					<MdLogout className="text-4xl mr-5 rotate-180" />
					<span className="text-2xl">Logout</span>
				</Button>
			</div>
		</div>
	);
};
