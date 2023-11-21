import React from 'react';

const Footer = () => {
	return (
		<footer className='w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs mt-auto'>
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
	);
};

export default Footer;
