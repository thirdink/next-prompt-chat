import z from 'zod';

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
