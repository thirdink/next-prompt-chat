import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

import { Database, Tables } from '@/database.types';
const supabase = createClient();

const getPromptCategories = async () => {
	// const { data, error } = await supabase.from('categories').select('*');
	const promptCategoriesQuery = supabase.from('categories').select('*');

	type promptCategories = QueryData<typeof promptCategoriesQuery>;

	const { data, error } = await promptCategoriesQuery;

	const promptCategories: promptCategories = data || [];

	return { promptCategories, error };
};

export const promptService = {
	getPromptCategories,
};
