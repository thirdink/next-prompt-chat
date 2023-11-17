import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the Auth Helpers package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const next = requestUrl.searchParams.get('next') ?? '/empty';

	if (code) {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			// URL to redirect to after sign in process completes
			return NextResponse.redirect(
				new URL(`/${next.slice(1)}`, request.url)
			);
		}
	}

	// error when signing in fails
	return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}
