import TopBar from '@/components/header/top-bar';
import AuthButton from '@/components/ui/AuthButton';
import { createClient } from '@/lib/supabase/server';

import { cookies } from 'next/headers';

export default async function Index() {
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
			<div className='space-y-0.5'>
				<div className='text-muted-foreground'>
					<TopBar />
				</div>
			</div>
			<div className='animate-in flex-1 flex flex-col gap-20 px-3 items-center'></div>
		</div>
	);
}
