import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ModeToggle } from '../theme-toggle';

export default async function AuthButton() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		'use server';

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.signOut();
		return redirect('/login');
	};

	return user ? (
		<div className='flex-column md:flex justify-end'>
			Hey, {user.email}!
			<form action={signOut}>
				<button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
					Logout
				</button>
			</form>
			<div>
				<ModeToggle />
			</div>
		</div>
	) : (
		<div className='flex-column md:flex justify-end'>
			<Link
				href='/login'
				className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
			>
				Login
			</Link>

			<div>
				<ModeToggle />
			</div>
		</div>
	);
}
