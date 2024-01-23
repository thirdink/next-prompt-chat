import z from 'zod';
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { promptSchema } from '@/lib/types/prompt/prompt-lib';
import { Database, Tables } from '@/database.types';

const supabase = createClient();
const promptFormSchema = promptSchema.promptFormSchema;

const getPromptCategories = async () => {
	// const { data, error } = await supabase.from('categories').select('*');
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

export const promptService = {
	getPromptCategories,
	getAllPrompts,
	postPrompt,
};
