'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { chatService } from '@/service/client/chat-service';
import { toast } from './ui/use-toast';
import { Json } from '@/database.types';

type ChatMessagesFromUser = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	messages: Json;
}[];
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
	const pathname = usePathname();

	const [history, setHistory] = useState<ChatMessagesFromUser>();

	const { messages, handleSubmit, setInput, append } = useChat({
		api: '/api/chat/chat-title',
	});

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
			const check = await append({
				role: 'user',
				content: JSON.stringify(chatMessages?.[0].messages),
			});
			return check;
		}
	};
	useEffect(() => {
		getAllUserChatData();
	}, []);
	useEffect(() => {
		messages.forEach((message) => {
			if (message.role === 'assistant') {
				console.log('messages', JSON.parse(message.content).title);
			}
		});
	}, [messages]);

	// use useChat from  ai/react to get the messages
	// use the messages to populate the sidebar

	return (
		<nav
			className={cn(
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						pathname === item.href
							? 'bg-muted hover:bg-muted'
							: 'hover:bg-transparent hover:underline',
						'justify-start'
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}
