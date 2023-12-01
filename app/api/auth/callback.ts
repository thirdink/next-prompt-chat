import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
	const YOUR_ID = 'kzxdjazyygylvrqmitli';
	const { supabase, response } = createClient(request);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const sessionCookies = {
		name: `sb-${YOUR_ID}-auth-token`,
		value: JSON.stringify(session),
		path: '/',
		expires: new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 365), // 1 year,
	};

	response.cookies.set(sessionCookies);

	return response;
}

export const config = {
	matcher: [
		'/',
		'/:path((?!_next/static|favicon.ico|_next/image|icons|manifest|api).*)',
	],
};
