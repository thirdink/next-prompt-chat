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
			`id, title, input, instructions, categories (id, name, created_at)`
		);
	return { data, error };
};

export const promptService = {
	insertPrompt,
	fetchPrompts,
};
