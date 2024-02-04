'use client';
import { useEffect, useState } from 'react';
import { chatService } from '@/service/client/chat-service';
import { toast } from '@/components/ui/use-toast';
import { protectedComponent } from '@/service/client/auth-service';

import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';
import { ResizablePanel } from '@/components/ui/resizable';

const chatHistory: React.FC = () => {
	const [history, setHistory] = useState<chatMessages[]>();
	const [chatSelected, setChatSelected] = useState<selectedChat>();
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

	// use useChat from  ai/react to get the messages
	// use the messages to populate the sidebar
	return (
		// <ResizablePanel
		// 	defaultSize={500}
		// 	minSize={15}
		// 	maxSize={20}
		// 	className='items-stretch'
		// >
		<List
			history={history}
			chatSelected={chatSelected}
			setChatSelected={setChatSelected}
		/>
		// </ResizablePanel>
	);
};

export default protectedComponent(chatHistory);
