import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

import { Database } from '@/database.types';
const supabase = createClient();

const getUserId = async () => {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) throw error;
	return user?.id;
};

const getUserData = async () => {
	const userId = await getUserId();
	const getAllChatMessagesForUser = supabase.rpc(
		'get_all_chat_messages_for_user',
		{
			p_user_id: userId!,
		}
	);

	type ChatMessage = QueryData<typeof getAllChatMessagesForUser>;

	const { data, error } = await getAllChatMessagesForUser;

	return { data, error };
};

export const chatService = {
	getUserData,
};
