'use client';
import { useContext, useEffect, useState } from 'react';
import { protectedComponent } from '@/service/client/auth-service';
import { chatService } from '@/service/client/chat-service';
import { PromptContext } from '@/data/context/PromptContext';
import { toast } from '@/components/ui/use-toast';

import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';

const chatHistory: React.FC = () => {
	const [prompts, dispatch] = useContext(PromptContext);
	const [history, setHistory] = useState<chatMessages[]>();
	const [chatSelected, setChatSelected] = useState<selectedChat | null>(null);
	const dispatchSelectedChat = () => {
		dispatch({ type: 'SELECTED_PROMPT', payload: chatSelected });
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
			setHistory(chatMessages);
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
		/>
	);
};

export default protectedComponent(chatHistory);
