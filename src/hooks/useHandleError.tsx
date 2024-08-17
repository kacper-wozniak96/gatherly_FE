import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { UseFormSetError } from 'react-hook-form';

interface FailedField {
	field: string;
	message: string;
}

interface IUseCaseError {
	message: string | FailedField[];
	isFormInvalid: boolean;
}

export const useHandleError = () => {
	const { enqueueSnackbar } = useSnackbar();

	const handleError = (error: unknown, setError: UseFormSetError<any>) => {
		if (!(error instanceof AxiosError)) {
			enqueueSnackbar('Something went wrong. Try again', { variant: 'error' });
			return;
		}

		if (error.response?.status === 500) {
			enqueueSnackbar('Something went wrong. Try again', { variant: 'error' });
			return;
		}

		const customErrorMessage = error.response?.data as IUseCaseError;

		if (customErrorMessage?.isFormInvalid) {
			const failedFields = customErrorMessage.message as FailedField[];
			failedFields.forEach((field) => {
				setError(field.field, { message: field.message });
			});
			return;
		} else {
			enqueueSnackbar(customErrorMessage.message as string, { variant: 'error' });
		}
	};

	return { handleError };
};
