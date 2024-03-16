import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ModeToggle } from '@/components/theme-toggle';

export default async function AuthButton() {
	const cookieStore = cookies();
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		'use server';

		const cookieStore = cookies();
		const supabase = createClient();
		await supabase.auth.signOut();
		return redirect('/login');
	};

	return user ? (
		<div className='flex-column flex justify-end'>
			<p className='py-2 px-4'>Hey, {user.email}!</p>
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
		<div className='flex-column flex justify-end'>
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
