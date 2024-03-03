'use client';

import React, { useContext, useEffect } from 'react';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { usePathname } from 'next/navigation';
import { PromptContext } from '@/data/context/PromptContext';

import { SidebarNav } from '@/components/sidebar/side-bar';
import { SelectedListDisplay } from '@/components/selected-list-display';

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
	const pathname = usePathname();
	const [prompts, dispatch] = useContext(PromptContext);

	const promptLibraryRegex = /\/dashboard\/prompt-library(\/.*)?/;
	const isPromptLibraryLink = promptLibraryRegex.test(pathname);

	const chatHistoryRegex = /\/dashboard\/chat-history(\/.*)?/;
	const isChatHistoryLink = chatHistoryRegex.test(pathname);

	// useEffect(() => {
	// 	console.log('defaultLayout ResizableLayout', defaultLayout);
	// });
	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes: number[]) => {
				// console.log('sizes: ', sizes);
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className='h-full items-stretch'
		>
			<div className='flex space-y-8 lg:flex-row lg:space-x-1 lg:space-y-0'>
				<aside className='hidden sm:flex -mx-4 w-1/8 p-5'>
					<SidebarNav
						defaultCollapsed={defaultCollapsed}
						defaultLayout={defaultLayout[0]}
						navCollapsedSize={navCollapsedSize}
					/>
				</aside>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={defaultLayout[1]}
					minSize={30}
					// className='items-stretch w-full'
				>
					<div className='flex-1  h-fit -mx-5'>{children}</div>
				</ResizablePanel>
				{isChatHistoryLink || isPromptLibraryLink ? (
					<>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={defaultLayout[2]}>
							<SelectedListDisplay
								item={prompts.selectedPrompt}
							/>
						</ResizablePanel>
					</>
				) : null}
			</div>
		</ResizablePanelGroup>
	);
};

export default ResizableLayout;
