import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Next.js and Supabase Starter Kit',
	description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
