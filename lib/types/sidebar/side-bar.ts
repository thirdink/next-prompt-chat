import { Json } from '@/database.types';
import { LucideIcon } from 'lucide-react';
export type ChatMessagesFromUser = {
	chat_id: string;
	chat_created_at: string;
	user_id: string;
	temp: number;
	max_length_tokens: number;
	top_p: number;
	messages: Json;
}[];

export type NavProps = {
	isCollapsed: boolean;
	links: {
		title: string;
		href?: string;
		icon: LucideIcon;
		variant: 'default' | 'ghost';
	}[];
};
export interface SidebarNavProps {
	className?: string;
	defaultLayout: number | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize?: number;
}
