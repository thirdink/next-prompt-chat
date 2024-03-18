import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? '/';

	if (code) {
		const cookieStore = cookies(); // Update the type of cookieStore to string
		const supabase = createClient(); // Pass the cookieStore to the createClient function
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`);
		}
	}
	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
