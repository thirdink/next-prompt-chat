'use client';
import { ComponentProps, useEffect, useState } from 'react';
import { chatService } from '@/service/client/chat-service';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { protectedComponent } from '@/service/client/auth-service';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
type chatMessages = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	title: string;
	messages: any;
};

type selectedChat = {
	selectedId: string;
	chatMessages: chatMessages;
};

type ChatMessagesFromUser = chatMessages[];

const chatHistory: React.FC = () => {
	const [history, setHistory] = useState<ChatMessagesFromUser>();
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
		<ScrollArea className='h-screen'>
			<div className='flex flex-col gap-2 p-4 pt-0'>
				{history &&
					history.map((chat) => (
						<button
							key={chat.chat_id}
							className={cn(
								'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
								chatSelected?.selectedId === chat.chat_id &&
									'bg-muted'
							)}
							onClick={() =>
								setChatSelected({
									chatMessages: chat,
									selectedId: chat.chat_id,
								})
							}
						>
							<div className='flex w-full flex-col gap-1'>
								<div className='flex items-center'>
									<div className='flex items-center gap-2'>
										<div className='font-semibold'>
											{chat.title}
										</div>
									</div>
									<div
										className={cn(
											'ml-auto text-xs',
											chatSelected?.selectedId ===
												chat.chat_id
												? 'text-foreground'
												: 'text-muted-foreground'
										)}
									>
										{formatDistanceToNow(
											new Date(chat.chat_created_at),
											{
												addSuffix: true,
											}
										)}
									</div>
								</div>
							</div>
							<div className='line-clamp-2 text-xs text-muted-foreground'>
								{String(
									(Array.isArray(chat.messages) &&
										chat.messages[0]
											?.message_content) as string
								).substring(0, 300)}
							</div>
						</button>
					))}
			</div>
		</ScrollArea>
	);
};
function getBadgeVariantFromLabel(
	label: string
): ComponentProps<typeof Badge>['variant'] {
	if (['work'].includes(label.toLowerCase())) {
		return 'default';
	}

	if (['personal'].includes(label.toLowerCase())) {
		return 'outline';
	}

	return 'secondary';
}

export default protectedComponent(chatHistory);
