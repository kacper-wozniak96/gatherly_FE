import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHandleError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiUserRoutes } from '@/services/api/userRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { FaRegFilePdf } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const generateReportForm = z.object({
	email: z.string().email(),
	reportId: z.string(),
});

type GenerateReportFormValues = z.infer<typeof generateReportForm>;

export const ActivityReport = () => {
	const navigate = useNavigate();
	const { handleError } = useHandleError();
	const { enqueueSnackbar } = useSnackbar();

	const fileId = useMemo(() => uuidv4(), []);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<GenerateReportFormValues>({
		resolver: zodResolver(generateReportForm),
	});

	const { mutateAsync: generateReportMutation } = useMutation({
		mutationFn: async (data: GenerateReportFormValues) => {
			try {
				await appAxiosInstance.post(ApiUserRoutes.generateActivityReport, data);
				enqueueSnackbar(
					'The report is being generated and will be delivered to the provided e-mail address within the next few minutes',
					{ variant: 'success' }
				);
				navigate(AppRoutes.toDashboard);
			} catch (error) {
				handleError(error, setError);
			}
		},
	});

	return (
		<>
			<h3 className="text-2xl text-center mt-10">
				Generate a report of your activity on platfrom straight to your email.<br></br>
				<b>Click the button to get started!</b> 🚀🚀
			</h3>
			<form className="mt-10 grid gap-10" onSubmit={handleSubmit((data) => generateReportMutation(data))}>
				<div>
					<Label htmlFor="email" isRequired>
						Email
					</Label>
					<Input
						{...register('email')}
						type="text"
						id="email"
						placeholder=""
						errorMessage={errors.email?.message}
					/>
				</div>
				<div>
					<Label>Report identifier</Label>
					<Input
						{...register('reportId')}
						type="text"
						readOnly
						inputClassName="opacity-50 cursor-not-allowed focus:outline-none focus:none focus:ring-none focus:outline-none focus:ring-0 focus:border-transparent"
						value={fileId}
					/>
				</div>
				<div>
					<Label>File format</Label>
					<FaRegFilePdf className="text-5xl opacity-50" />
				</div>
				<Button type="submit" className="text-2xl p-8">
					Generate report
				</Button>
			</form>
		</>
	);
};
