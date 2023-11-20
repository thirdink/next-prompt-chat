import { Metadata } from 'next';
import { SidebarNav } from '@/components/side-bar';
import TopBar from '@/components/Top-Bar';

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
			<div className='space-y-6 md:block min-h-screen'>
				<div className='space-y-0.5'>
					<div className='text-muted-foreground'>
						<TopBar />
					</div>
				</div>
				<div className='flex flex-col pl-10 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1  h-fit'>{children}</div>
				</div>
				<footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs align-bottom'>
					<p>
						Made by{' '}
						<a
							href='https://rumitt.net'
							target='_blank'
							className='font-bold hover:underline'
							rel='noreferrer'
						>
							rumitt.net
						</a>
					</p>
				</footer>
			</div>
		</>
	);
}
