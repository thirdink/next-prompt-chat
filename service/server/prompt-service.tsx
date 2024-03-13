import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Tables } from '@/database.types';
import { unstable_noStore } from 'next/cache';

const getSupabaseClient = () => {
	const cookieStore = cookies();
	return createClient();
};

const insertPrompt = async (prompt: Partial<Tables<'prompt'>>) => {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from('prompt')
		.insert([prompt])
		.select();
	return { data, error };
};

const fetchPrompts = async () => {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from('prompt')
		.select(
			`id, title, input, instructions, created_at, categories (id, name, created_at)`
		)
		.order('created_at', { ascending: false });
	return { data, error };
};

const deletePromptById = async (id: string) => {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase.from('prompt').delete().eq('id', id);
	return { data, error };
};

const fetchPromptById = async (id: string) => {
	const supabase = getSupabaseClient();
	unstable_noStore();
	const { data, error } = await supabase
		.from('prompt')
		.select(
			`id, title, input, instructions, created_at, categories (id, name, created_at)`
		)
		.eq('id', id)
		.single();

	return { data, error };
};

export const promptService = {
	fetchPromptById,
	insertPrompt,
	fetchPrompts,
	deletePromptById,
};
