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
	chatMessages: chatMessages;
};

export type ChatMessagesFromUser = chatMessages[];
