import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Tables } from '@/database.types';

const insertCategory = async (category: Partial<Tables<'categories'>>) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase
		.from('categories')
		.insert([{ ...category, name: category.name ?? '' }])
		.select();
	return { data, error };
};

export const categoriesService = {
	insertCategory,
};
