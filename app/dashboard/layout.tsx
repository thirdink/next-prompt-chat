import { Metadata } from 'next';
import { SidebarNav } from '@/components/side-bar';
import TopBar from '@/components/top-bar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
	title: 'prompt lib',
	description: 'create and store your prompts',
};

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<>
			<div className='min-h-screen flex flex-col m-auto p-auto w-full'>
				<div className='space-y-0.5'>
					<div className='text-muted-foreground'>
						<TopBar />
					</div>
				</div>
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-1 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/8 p-5'>
						<SidebarNav />
					</aside>
					<div className='flex-1  h-fit -mx-5 lg:w-4/5'>
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
