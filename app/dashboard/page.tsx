import React from 'react';

import Header from '@/components/ui/Header';
import TopBar from '@/components/Top-Bar';

const page = () => {
	return (
		<div className='flex-col flex '>
			<TopBar />

			<div className='animate-in flex-1 flex flex-col gap-20 px-3 justify-items-center'>
				<Header />
			</div>

			<footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs align-bottom'>
				<p>
					Made by{' '}
					<a
						href='https://rumitt.net'
						target='_blank'
						className='font-bold hover:underline'
						rel='noreferrer'
					>
						rumitt.net
					</a>
				</p>
			</footer>
		</div>
	);
};

export default page;
