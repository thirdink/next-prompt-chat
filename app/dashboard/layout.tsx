import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SidebarNav } from '@/components/sidebar/side-bar';
import TopBar from '@/components/header/top-bar';
import Footer from '@/components/footer';
import { PromptProvider } from '@/data/context/PromptContext';

import ResizableLayout from '@/components/resizable-layout';
import { TooltipProvider } from '@/components/ui/tooltip';
export const metadata: Metadata = {
	title: 'prompt lib',
	description: 'create and store your prompts',
};

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const supabase = createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}
	const layout = cookies().get('react-resizable-panels:layout');
	const collapsed = cookies().get('react-resizable-panels:collapsed');
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed
		? JSON.parse(collapsed.value)
		: undefined;

	return (
		<PromptProvider>
			<TooltipProvider delayDuration={0}>
				<div className='min-h-screen flex flex-col m-auto p-auto w-full'>
					<div className='space-y-0.5'>
						<div className='text-muted-foreground'>
							<TopBar />
						</div>
					</div>
					<ResizableLayout
						children={children}
						defaultLayout={defaultLayout}
						defaultCollapsed={defaultCollapsed}
						navCollapsedSize={4}
					/>

					<Footer />
				</div>
			</TooltipProvider>
		</PromptProvider>
	);
}
