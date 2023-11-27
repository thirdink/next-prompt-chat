import { Metadata } from 'next';
import { SidebarNav } from '@/components/side-bar';
import TopBar from '@/components/Top-Bar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
	title: 'Forms',
	description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
	{
		title: 'Profile',
		href: '/examples/forms',
	},
	{
		title: 'Account',
		href: '/examples/forms/account',
	},
	{
		title: 'Appearance',
		href: '/examples/forms/appearance',
	},
	{
		title: 'Notifications',
		href: '/examples/forms/notifications',
	},
	{
		title: 'Display',
		href: '/examples/forms/display',
	},
];

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
				<div className='flex flex-col pl-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/8 pt-3'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1  h-fit -mx-5 w-fill-available'>
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
