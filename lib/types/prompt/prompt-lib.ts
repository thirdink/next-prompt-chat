import z from 'zod';
import { Tables } from '@/database.types';
import { categoriesProps } from '@/lib/types/categories/categories-lib';

const promptFormSchema = z.object({
	title: z
		.string()
		.min(5, { message: 'Title must be at least 5 character long' }),
	input: z
		.string()
		.min(5, { message: 'Input must be at least 5 character long' }),
	instructions: z.string(),
	categories: z.string().nullable(),
});

type categoriesType = {
	categories: categoriesProps;
};
export type PromptProps = Tables<'prompt'> & categoriesType;

export type HandleDeleteParams = {
	id?: string;
	chat_id?: string;
};
export const promptSchema = {
	promptFormSchema,
};
