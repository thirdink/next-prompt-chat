import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
	const preResponse = await updateSession(request);
	const promptLibraryRegex = /\/dashboard\/prompt-library(\/.*)?/;
	const isPromptLibraryLink = promptLibraryRegex.test(
		request.nextUrl.pathname
	);

	// Redirect to /dashboard if the user is signed in and the current path is /
	if (preResponse.user.data.user && request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/dashboard/', request.url));
	}
	if (preResponse.user.data.user === null && isPromptLibraryLink) {
		return NextResponse.redirect(
			new URL(`/prompt/${request.nextUrl.search}`, request.url)
		);
	}
	// Redirect to /login if the user is not signed in and the current path is not /
	// if (!preResponse.user && request.nextUrl.pathname !== '/') {

	// 	return NextResponse.redirect(new URL('/login', request.url));
	// }

	return preResponse.response;
}

export const config = {
	// Add comments to explain the purpose of URL patterns for future maintainability
	matcher: [
		// Matches any path except specified static files and image optimization files
		'/((?!_next/static|_next/image|favicon.ico).*)',
		// Matches the root path
		'/',
		// Matches any path starting with /dashboard
		'/dashboard/:path*',
	],
};
