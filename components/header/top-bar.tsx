import React from 'react';
import AuthButton from '@/components/ui/AuthButton';
import InnerTopBar from './inner-top-bar';

const TopBar = () => {
	return (
		<nav className='border-b sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='flex flex-row'>
				<InnerTopBar />
				<div className='flex h-16 items-center px-4 ml-auto'>
					<AuthButton />
				</div>
			</div>
		</nav>
	);
};

export default TopBar;
