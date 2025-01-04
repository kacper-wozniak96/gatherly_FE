import { reportIdSchema, userEmailSchema } from 'gatherly-types';
import { z } from 'zod';

export const formSchema = z.object({}).merge(userEmailSchema).merge(reportIdSchema);
export type GenerateReportFormTypes = z.infer<typeof formSchema>;
