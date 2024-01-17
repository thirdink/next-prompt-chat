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

	type ChatMessagesFromUser = QueryData<typeof getAllChatMessagesForUser>;

	const { data, error } = await getAllChatMessagesForUser;

	const chatMessages: ChatMessagesFromUser = data || [];

	return { chatMessages, error };
};

const insertChatMessages = async ({
	chatId,
	message,
	temperature,
	topP,
	instructions,
	title,
}: {
	chatId: string;
	message: any;
	temperature: number[];
	topP: number[];
	instructions: string;
	title: string;
}) => {
	const insertChatMessages = supabase.rpc('insert_chat_messages', {
		p_chat_id: chatId,
		max_length_tokens: 256,
		message_content: message.content,
		instructions,
		role: message.role,
		temp: temperature[0],
		top_p: topP[0],
		title: title,
	});

	const { data, error } = await insertChatMessages;

	return { data, error };
};

export const chatService = {
	getUserData,
	insertChatMessages,
};
