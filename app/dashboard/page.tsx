import React from 'react';
import AuthButton from '@/components/ui/AuthButton';
import { createClient } from '@/lib/supabase/server';
import Header from '@/components/ui/Header';
import { cookies } from 'next/headers';
const page = () => {
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
		<div className='flex-col md:flex'>
			<nav className='border-b'>
				<div className='flex h-16 items-center px-4 justify-end'>
					{isSupabaseConnected && <AuthButton />}
				</div>
			</nav>

			<div className='animate-in flex-1 flex flex-col gap-20 opacity-0 px-3 justify-items-center'>
				<Header />
			</div>

			<footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs'>
				<p>
					Powered by{' '}
					<a
						href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
						target='_blank'
						className='font-bold hover:underline'
						rel='noreferrer'
					>
						Supabase
					</a>
				</p>
			</footer>
		</div>
	);
};

export default page;
