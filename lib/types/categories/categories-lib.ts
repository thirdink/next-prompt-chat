import z from 'zod';
// import { Tables} from '@/database/types';

const categoriesSchemaObj = z.object({
	created_at: z.string(),
	id: z.string(),
	name: z.string(),
});
const categoriesInsertSchema = z.object({
	name: z.string(),
});

const categoriesSchemaArray = z.array(categoriesSchemaObj);
export type categoriesProps = z.infer<typeof categoriesSchemaObj>;

export const categoriesSchema = {
	categoriesInsertSchema,
	categoriesSchemaObj,
	categoriesSchemaArray,
};
