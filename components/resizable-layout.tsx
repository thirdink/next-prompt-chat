'use client';

import React, { useState } from 'react';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { SidebarNav } from '@/components/sidebar/side-bar';

interface ResizableLayoutProps {
	children: React.ReactNode;
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize?: number;
}

const ResizableLayout = ({
	children,
	defaultLayout = [265, 600, 655],
	defaultCollapsed = false,
	navCollapsedSize,
}: ResizableLayoutProps) => {
	return (
		<ResizablePanelGroup
			direction='horizontal'
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className=' items-stretch'
		>
			<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-1 lg:space-y-0'>
				<aside className='-mx-4 lg:w-1/8 p-5'>
					<SidebarNav
						defaultCollapsed={defaultCollapsed}
						defaultLayout={defaultLayout}
						navCollapsedSize={navCollapsedSize}
					/>
				</aside>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={defaultLayout[2]}
					minSize={40}
					className='items-stretch w-full'
				>
					<div className='flex-1  h-fit -mx-5'>{children}</div>
				</ResizablePanel>
			</div>
		</ResizablePanelGroup>
	);
};

export default ResizableLayout;
