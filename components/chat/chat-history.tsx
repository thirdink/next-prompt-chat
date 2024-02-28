'use client';
import { useContext, useEffect, useState } from 'react';
import { protectedComponent } from '@/service/client/auth-service';
import { chatService } from '@/service/client/chat-service';
import { PromptContext } from '@/data/context/PromptContext';
import { toast } from '@/components/ui/use-toast';
import { HandleDeleteParams } from '@/lib/types/prompt/prompt-lib';

import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';

const chatHistory: React.FC = () => {
	const [prompts, dispatch] = useContext(PromptContext);
	const [history, setHistory] = useState<chatMessages[]>();
	const [chatSelected, setChatSelected] = useState<selectedChat | null>(null);
	const dispatchSelectedChat = () => {
		dispatch({ type: 'SELECTED_PROMPT', payload: chatSelected });
	};
	const handleDelete = async (params: HandleDeleteParams) => {
		// chat_id from chat history component
		if (params.chat_id) {
			console.log('delete chat_id: ', params.chat_id);
			const result = await chatService.deleteChatById(params.chat_id);
			if (result?.status === 200) {
				toast({
					title: 'Prompt Deleted',
					description: 'chat has been deleted',
				});
				getAllUserChatData();
			}
			if (result?.status === 500) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong with deleting the prompt.',
					description: JSON.stringify(result?.body),
				});
			}
		}
	};

	const getAllUserChatData = async () => {
		const { chatMessages, error } = await chatService.getUserData();
		if (error) {
			console.error('supabase error', error);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with supabase',
				description: error.message,
			});
		}
		if (chatMessages) {
			setHistory(chatMessages as chatMessages[]);
		}
	};
	useEffect(() => {
		getAllUserChatData();
	}, []);

	useEffect(() => {
		dispatchSelectedChat();
	}, [chatSelected]);

	return (
		<List
			items={history}
			chatSelected={chatSelected}
			setChatSelected={setChatSelected}
			handleDelete={handleDelete}
		/>
	);
};

export default protectedComponent(chatHistory);
