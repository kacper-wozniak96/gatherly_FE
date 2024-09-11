import { AppRoutes } from '@/components/routes/AppRoutes';

import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useHandleFormError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { accessTokenKey, localStorageUserIdKey } from '@/utils/accessToken';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export const Logout = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { handleFormError } = useHandleFormError();

	const { mutateAsync: logout } = useMutation({
		mutationFn: async () => {
			try {
				await appAxiosInstance.post(ApiPostRoutes.userLogout);
				enqueueSnackbar('Logged out successfully', { variant: 'success' });
				localStorage.removeItem(localStorageUserIdKey);
				navigate(AppRoutes.toSignIn);
			} catch (error) {
				handleFormError(error);
			}
		},
	});

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="flex items-center">
						<MdLogout className="ml-3 text-4xl cursor-pointer text-slate-700" onClick={() => logout()} />;
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Logout</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
