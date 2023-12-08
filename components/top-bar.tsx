import AuthButton from '@/components/ui/AuthButton';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

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
		<nav className='border-b'>
			<div className='flex h-16 items-center px-4 justify-end'>
				{isSupabaseConnected && <AuthButton />}
			</div>
		</nav>
	);
};

export default TopBar;
