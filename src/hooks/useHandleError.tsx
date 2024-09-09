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

export const useHandleFormError = () => {
	const { enqueueSnackbar } = useSnackbar();

	const handleFormError = (error: unknown, setError?: UseFormSetError<any>) => {
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

			if (setError) {
				failedFields.forEach((field) => {
					setError(field.field, { message: field.message });
				});
			}
		} else {
			enqueueSnackbar(customErrorMessage.message as string, { variant: 'error' });
		}
	};

	return { handleFormError };
};
