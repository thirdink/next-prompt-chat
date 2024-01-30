'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Bot, FolderClock, User, MessageSquareCode } from 'lucide-react';
// import { MessageSquareCode } from '@/components/ui/icons';
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { chatService } from '@/service/client/chat-service';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/database.types';
import { Nav } from '@/components/sidebar/nav';

type ChatMessagesFromUser = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	messages: Json;
}[];

type NavProps = {
	isCollapsed: boolean;
	links: {
		title: string;
		href?: string;
		icon: LucideIcon;
		variant: 'default' | 'ghost';
	}[];
};
interface SidebarNavProps {
	className?: string;
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize?: number;
}
export function SidebarNav({
	className,
	defaultCollapsed,
	navCollapsedSize,
	defaultLayout = [265, 440, 655],
	...props
}: SidebarNavProps) {
	const pathname = usePathname();
	const sidebarNavItems: NavProps['links'] = [
		{
			title: 'Chat',
			href: '/dashboard',
			icon: Bot,
			variant: 'default',
		},
		{
			title: 'Prompt Library',
			href: '/dashboard/prompt-library',
			icon: MessageSquareCode,
			variant: 'ghost',
		},
		{
			title: 'Chat History',
			href: '/dashboard/chat-history',
			icon: FolderClock,
			variant: 'ghost',
		},
		{
			title: 'Profile',
			href: '/dashboard/profile',
			icon: User,
			variant: 'ghost',
		},
	];
	const [items, setItems] = useState(sidebarNavItems);
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

	return (
		<ResizablePanel
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible={true}
			minSize={15}
			maxSize={20}
			onCollapse={() => {
				setIsCollapsed(true);
				document.cookie = 'react-resizable-panels:collapsed=true';
			}}
			onExpand={() => {
				setIsCollapsed(false);
				document.cookie = 'react-resizable-panels:collapsed=false';
			}}
			className={cn(
				isCollapsed &&
					'min-w-[50px] transition-all duration-300 ease-in-out'
			)}
		>
			<Nav isCollapsed={isCollapsed!} links={items} />
		</ResizablePanel>
	);
}
