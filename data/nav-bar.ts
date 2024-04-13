import { NavProps, SidebarNavProps } from '@/lib/types/sidebar/side-bar';
import { Bot, FolderClock, User, MessageSquareCode } from 'lucide-react';
export const sidebarNavItems: NavProps['links'] = [
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
	// {
	// 	title: 'Profile',
	// 	href: '/dashboard/profile',
	// 	icon: User,
	// 	variant: 'ghost',
	// },
];
