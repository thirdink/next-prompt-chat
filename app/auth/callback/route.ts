import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const next = requestUrl.searchParams.get('next') ?? '/empty';

	if (code) {
		const cookieStore = cookies(); // Update the type of cookieStore to string
		const supabase = createClient(); // Pass the cookieStore to the createClient function
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(
				new URL(`/${next.slice(1)}`, request.url)
			);
		}
	}

	return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}
