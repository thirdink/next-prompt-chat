import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { MessageSquareCode } from 'lucide-react';

import { UserAuthForm } from '@/components/user-auth-form';

import SignUpForm from '@/components/sign-up-form';

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication forms built using the components.',
};

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function AuthenticationPage() {
	return (
		<>
			<div
				className={cn(
					'flex min-h-screen bg-background font-sans antialiased w-full items-center',
					fontSans.variable
				)}
			>
				<div className='container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
					<SignUpForm />

					<div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
						<div className='relative z-20 flex items-center text-lg font-medium'>
							<MessageSquareCode />
							<span className=' font-bold sm:inline-block'>
								Prompt Lib
							</span>
						</div>

						<div className='relative z-20 mt-auto'>
							{/* <blockquote className='space-y-2'>
								<p className='text-lg'>
									&ldquo;This library has saved me countless
									hours of work and helped me deliver stunning
									designs to my clients faster than ever
									before.&rdquo;
								</p>
								<footer className='text-sm'>Sofia Davis</footer>
							</blockquote> */}
						</div>
					</div>
					<div className='lg:p-8'>
						<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
							<div className='flex flex-col space-y-2 text-center'>
								<h1 className='text-2xl font-semibold tracking-tight'>
									Login in
								</h1>
								<p className='text-sm text-muted-foreground'>
									Enter your email below to login to your
									account
								</p>
							</div>
							<UserAuthForm />
							<p className='px-8 text-center text-sm text-muted-foreground'>
								By clicking continue, you agree to our{' '}
								<Link
									href='/terms'
									className='underline underline-offset-4 hover:text-primary'
								>
									Terms of Service
								</Link>{' '}
								and{' '}
								<Link
									href='/privacy'
									className='underline underline-offset-4 hover:text-primary'
								>
									Privacy Policy
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
