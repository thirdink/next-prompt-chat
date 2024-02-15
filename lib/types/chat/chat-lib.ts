import type { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { Tables } from '@/database.types';
export type Messages = Tables<'messages'>;
export type chatMessages = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	title: string;
	messages: any;
};

export type selectedChat = {
	selectedId: string;
	chatMessages: chatMessages | PromptProps;
};

export type ChatMessagesFromUser = chatMessages[];
