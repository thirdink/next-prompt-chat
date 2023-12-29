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
interface SidebarNavProps {
	items: {
		href: string;
		title: string;
	}[];
}
const sidebarNavItems = [
	{
		title: 'Chat',
		href: '/dashboard',
	},
	{
		title: 'Prompt Library',
		href: '/dashboard/prompt-library',
	},
	{
		title: 'Chat History',
		href: '/dashboard/chat-history',
	},
	{
		title: 'Profile',
		href: '/dashboard/profile',
	},
];

export function SidebarNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const [items, setItems] = useState(sidebarNavItems);

	// const { messages, handleSubmit, setInput, append } = useChat({
	// 	api: '/api/chat/chat-title',
	// });

	return (
		<nav
			className={cn(
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
				className
			)}
			{...props}
		>
			{items.length > 0 &&
				items.map((item) => (
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
