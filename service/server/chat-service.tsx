import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

const getSupabaseClient = () => {
	const cookieStore = cookies();
	return createClient();
};

const deleteChatById = async (id: string) => {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from('chats')
		.delete()
		.eq('chat_id', id);

	return { data, error };
};

export const chatService = {
	deleteChatById,
};
