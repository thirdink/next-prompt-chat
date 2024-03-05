import React from 'react';

export function GridBackground() {
	return (
		<div className='h-[50rem] w-full dark:bg-background bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center'>
			{/* Radial gradient for the container to give a faded look */}
			<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
			<p className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
				Prompt lib
			</p>
			<br />
			<p className=' text-base sm:text-7xl font-normal relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
				coming soon
			</p>
		</div>
	);
}
