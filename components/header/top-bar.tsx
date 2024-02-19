import React from 'react';
import AuthButton from '@/components/ui/AuthButton';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import InnerTopBar from './inner-top-bar';

const TopBar = () => {
	const cookieStore = cookies();

	const canInitSupabaseClient = () => {
		// This function is just for the interactive tutorial.
		// Feel free to remove it once you have Supabase connected.
		try {
			createClient(cookieStore);
			return true;
		} catch (e) {
			return false;
		}
	};
	const isSupabaseConnected = canInitSupabaseClient();
	return (
		<nav className='border-b sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='flex flex-row'>
				<InnerTopBar />
				<div className='flex h-16 items-center px-4 ml-auto'>
					{isSupabaseConnected && <AuthButton />}
				</div>
			</div>
		</nav>
	);
};

export default TopBar;
