import { AxiosError } from 'axios';
import { IFailedField, IUseCaseError } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { UseFormSetError } from 'react-hook-form';

export const useHandleError = () => {
	const { enqueueSnackbar } = useSnackbar();

	const handleError = (error: unknown, setError?: UseFormSetError<any>) => {
		if (!(error instanceof AxiosError)) {
			enqueueSnackbar('Something went wrong. Try again', { variant: 'error' });
			return;
		}

		if (error.response?.status === 500) {
			enqueueSnackbar('Something went wrong. Try again', { variant: 'error' });
			return;
		}

		const useCaseError = error.response?.data as IUseCaseError;

		if (useCaseError?.isFormInvalid && setError) {
			const failedFields = useCaseError.message as IFailedField[];

			failedFields.forEach((failedField) => {
				setError(failedField.field, { message: failedField.message });
			});

			return;
		}

		enqueueSnackbar(useCaseError.message as string, { variant: 'error' });
		// if (customErrorMessage.isForSnackbar) {
		// 	return;
		// }

		// enqueueSnackbar('Something went wrong. Try again in few mins', { variant: 'error' });
	};

	return { handleError };
};
