'use client';

import React, { useState } from 'react';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SidebarNav } from '@/components/sidebar/side-bar';
import { Bot, FolderClock, User, MessageSquareCode } from 'lucide-react';
import {
	ChatMessagesFromUser,
	NavProps,
	SidebarNavProps,
} from '@/lib/types/sidebar/side-bar';
import { Nav } from '@/components/sidebar/nav';

interface ResizableLayoutProps {
	children: React.ReactNode;
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize?: number;
}

const ResizableLayout = ({
	children,
	defaultLayout = [265, 440, 655],
	defaultCollapsed = false,
	navCollapsedSize,
}: ResizableLayoutProps) => {
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
	const pathname = usePathname();
	const [items, setItems] = useState(sidebarNavItems);
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

	const isResizablePanel = () => {
		// if()
		return false;
	};

	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className='h-full items-stretch'
		>
			<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-1 lg:space-y-0'>
				<aside className='-mx-4 lg:w-1/8 p-5'>
					<SidebarNav
						defaultCollapsed={defaultCollapsed}
						defaultLayout={defaultLayout}
						navCollapsedSize={navCollapsedSize}
					/>
					{/* <ResizablePanel
						defaultSize={defaultLayout[0]}
						collapsedSize={navCollapsedSize}
						collapsible={true}
						minSize={15}
						maxSize={20}
						onCollapse={() => {
							setIsCollapsed(true);
							document.cookie =
								'react-resizable-panels:collapsed=true';
						}}
						onExpand={() => {
							setIsCollapsed(false);
							document.cookie =
								'react-resizable-panels:collapsed=false';
						}}
						className={cn(
							isCollapsed &&
								'min-w-[50px] transition-all duration-300 ease-in-out'
						)}
					>
						<Nav isCollapsed={isCollapsed!} links={items} />
					</ResizablePanel> */}
				</aside>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={defaultLayout[1]}
					minSize={30}
					// className='items-stretch w-full'
				>
					<div className='flex-1  h-fit -mx-5'>{children}</div>
				</ResizablePanel>
				{pathname === '/dashboard/chat-history' ||
					(pathname === '/dashboard/prompt-library' && (
						<>
							<ResizableHandle withHandle />
							<ResizablePanel
								defaultSize={defaultLayout[2]}
							></ResizablePanel>
						</>
					))}
			</div>
		</ResizablePanelGroup>
	);
};

export default ResizableLayout;
