import z, { string } from 'zod';
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { promptSchema } from '@/lib/types/prompt/prompt-lib';

const supabase = createClient();

const promptFormSchema = promptSchema.promptFormSchema;

const getPromptCategories = async () => {
	const promptCategoriesQuery = supabase.from('categories').select('*');

	type promptCategories = QueryData<typeof promptCategoriesQuery>;

	const { data, error } = await promptCategoriesQuery;

	const promptCategories: promptCategories = data || [];

	return { promptCategories, error };
};

const getAllPrompts = async () => {
	try {
		const getPrompts = await fetch('/api/prompt', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return getPrompts.json();
	} catch (e: any) {
		console.error('getAllPrompts Error', e);
	}
};

const postPrompt = async (promptInput: z.infer<typeof promptFormSchema>) => {
	try {
		const postPrompt = await fetch('/api/prompt', {
			method: 'POST',
			body: JSON.stringify(promptInput),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return postPrompt;
	} catch (e: any) {
		console.error('postPrompt Error', e);
	}
};

type category = {
	category: {
		name: string;
	};
};

const insertPromptCategory = async ({ category }: category) => {
	try {
		const response = await fetch('/api/categories', {
			method: 'POST',
			body: JSON.stringify(category),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (e: any) {
		console.error('insertPromptCategory Error', e);
	}
};

const deletePrompt = async (id: string) => {
	try {
		const response = await fetch('/api/prompt/', {
			method: 'DELETE',
			body: JSON.stringify({
				id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (e: any) {
		console.error('deletePrompt Error', e);
	}
};
export const promptService = {
	deletePrompt,
	getPromptCategories,
	getAllPrompts,
	postPrompt,
	insertPromptCategory,
};
