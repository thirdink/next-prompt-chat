import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Tables } from '@/database.types';

const insertPrompt = async (prompt: Partial<Tables<'prompt'>>) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase
		.from('prompt')
		.insert([prompt])
		.select();
	return { data, error };
};

const fetchPrompts = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase
		.from('prompt')
		.select(
			`id, title, input, instructions, created_at, categories (id, name, created_at)`
		)
		.order('created_at', { ascending: false });
	return { data, error };
};

const deletePromptById = async (id: string) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.from('prompt').delete().eq('id', id);
	return { data, error };
};

export const promptService = {
	insertPrompt,
	fetchPrompts,
	deletePromptById,
};
