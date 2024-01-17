import z from 'zod';
import { Tables } from '@/database.types';

const promptFormSchema = z.object({
	title: z.string(),
	input: z.string(),
	instructions: z.string(),
	categories: z.string(),
});

const categoriesSchemaObj = z.object({
	created_at: z.string(),
	id: z.string(),
	name: z.string(),
});

const categoriesSchemaArray = z.array(categoriesSchemaObj);

export const promptSchema = {
	promptFormSchema,
	categoriesSchemaObj,
	categoriesSchemaArray,
};


export type PromptProps = Tables<'prompt'> & {
	categories: {
		created_at: string;
		id: string;
		name: string;
	};
};