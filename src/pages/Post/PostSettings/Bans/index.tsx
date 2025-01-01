import { AppRoutes } from '@/components/routes/AppRoutes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useHandleFormError } from '@/hooks/useHandleError';
import { appAxiosInstance } from '@/services/api/axios,';
import { ApiPostRoutes } from '@/services/api/postRoutes';
import { ReactQueryKeys } from '@/services/api/ReactQueryKeys/reactQueryKeys';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplyPostBanRequestDTO, EBanType } from 'gatherly-types';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BansProps, postBansFormSchema, PostBansFormValues } from './types';

export const Bans = ({ userId, postUserBans }: BansProps) => {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { handleFormError } = useHandleFormError();
	const navigate = useNavigate();

	const form = useForm<PostBansFormValues>({
		resolver: zodResolver(postBansFormSchema),
		defaultValues: {
			isBannedFromViewingPost: postUserBans?.some((ban) => ban.type === EBanType.viewingPost),
			isBannedFromVoting: postUserBans?.some((ban) => ban.type === EBanType.downVotingAndUpVoting),
			isBannedFromAddingComments: postUserBans?.some((ban) => ban.type === EBanType.addingComments),
		},
	});

	useEffect(() => {
		if (!userId) return;

		form.setValue('isBannedFromViewingPost', postUserBans?.some((ban) => ban.type === EBanType.viewingPost));
		form.setValue('isBannedFromVoting', postUserBans?.some((ban) => ban.type === EBanType.downVotingAndUpVoting));
		form.setValue('isBannedFromAddingComments', postUserBans?.some((ban) => ban.type === EBanType.addingComments));
	}, [userId]);

	const { mutateAsync: applyBanMutation } = useMutation({
		mutationFn: async (data: PostBansFormValues) => {
			try {
				const bansChanges: Partial<Record<EBanType, boolean>> = {};

				if (form.formState.dirtyFields?.isBannedFromViewingPost) {
					bansChanges[EBanType.viewingPost] = data.isBannedFromViewingPost;
				}

				if (form.formState.dirtyFields?.isBannedFromAddingComments) {
					bansChanges[EBanType.addingComments] = data.isBannedFromAddingComments;
				}

				if (form.formState.dirtyFields?.isBannedFromVoting) {
					bansChanges[EBanType.downVotingAndUpVoting] = data.isBannedFromVoting;
				}

				const dto: ApplyPostBanRequestDTO = {
					bansChanges,
				};

				await appAxiosInstance.post(ApiPostRoutes.applyPostBans(Number(id), userId), dto);
				queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.fetchPostUserBans] });
				enqueueSnackbar('Bans applied successfully', { variant: 'success' });
				navigate(AppRoutes.redirectToPost(Number(id)));
				form.reset();
			} catch (error) {
				handleFormError(error, form.setError);
			}
		},
	});

	return (
		<div className="my-10">
			<Separator orientation="horizontal" className="h-0.5 bg-gray-300 my-10" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit((data) => applyBanMutation(data))} className="space-y-6">
					<FormField
						control={form.control}
						name="isBannedFromViewingPost"
						render={({ field }) => (
							<FormItem className="flex items-center">
								<FormControl className="mr-3">
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="w-7 h-7"
									/>
								</FormControl>
								<FormLabel className="text-2xl mt-0">Ban from viewing post</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="isBannedFromAddingComments"
						render={({ field }) => (
							<FormItem className="flex items-center">
								<FormControl className="mr-3">
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="w-7 h-7"
									/>
								</FormControl>
								<FormLabel className="text-2xl mt-0">Ban from adding comments</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="isBannedFromVoting"
						render={({ field }) => (
							<FormItem className="flex items-center">
								<FormControl className="mr-3">
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="w-7 h-7"
									/>
								</FormControl>
								<FormLabel className="text-2xl mt-0">Ban from Upvoting / downvoting</FormLabel>
							</FormItem>
						)}
					/>
					<div>
						<Button type="submit" className="text-lg">
							Save
						</Button>
						<Button
							className="ml-3 text-lg"
							variant="outline"
							onClick={() => navigate(AppRoutes.redirectToPost(Number(id)))}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
