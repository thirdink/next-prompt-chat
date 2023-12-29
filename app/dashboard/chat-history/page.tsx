'use client';
import { useEffect, useState } from 'react';
import { chatService } from '@/service/client/chat-service';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/database.types';

import { BellIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Date from '@/components/date';
import { Switch } from '@/components/ui/switch';

type ChatMessagesFromUser = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	title: string;
	messages: Json;
}[];

export default function Page({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const [history, setHistory] = useState<ChatMessagesFromUser>();
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
			console.log('chatMessages: ', chatMessages);
			setHistory(chatMessages);
			// const check = await append({
			// 	role: 'user',
			// 	content: JSON.stringify(chatMessages?.[0].messages),
			// });
			// return check;
		}
	};
	useEffect(() => {
		getAllUserChatData();
	}, []);
	// useEffect(() => {
	// 	messages?.forEach((message) => {
	// 		if (message.role === 'assistant') {
	// 			console.log('messages', JSON.parse(message.content).title);
	// 		}
	// 	});
	// }, [messages]);

	// use useChat from  ai/react to get the messages
	// use the messages to populate the sidebar
	return (
		<>
			<Card className={cn('w-[380px]', className)} {...props}>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
					<CardDescription>
						You have 3 unread messages.
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div>
						{history &&
							history?.map((chat, index) => (
								<div
									key={index}
									className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
								>
									<span className='flex h-2 w-2 translate-y-1' />
									<div className='space-y-1'>
										<p className='text-sm font-medium leading-none'>
											{chat.title}
										</p>
										<p className='text-sm text-muted-foreground'>
											<Date
												dateString={
													chat.chat_created_at
												}
											/>
										</p>
									</div>
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
