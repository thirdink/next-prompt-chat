'use client';
import React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import { sidebarNavItems } from '@/data/nav-bar';
import { MessageSquareCode } from 'lucide-react';
import { MobileNav } from '@/components/header/mobile-nav';

const InnerTopBar: React.FC = () => {
	const items = sidebarNavItems;
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
	return (
		<>
			<Link
				href='/'
				className='hidden items-center space-x-2 md:flex ml-3'
			>
				<MessageSquareCode />
				<span className='hidden font-bold sm:inline-block'>
					Prompt Lib
				</span>
			</Link>
			<button
				className='flex items-center space-x-2 md:hidden'
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.logo />}
				<span className='font-bold'>Menu</span>
			</button>
			{showMobileMenu && items && <MobileNav items={items} />}
		</>
	);
};
export default InnerTopBar;
