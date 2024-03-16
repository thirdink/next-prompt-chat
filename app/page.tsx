import TopBar from '@/components/header/top-bar';

import { GridBackground } from '@/components/grid-background';

export default async function Index() {
	return (
		<div className='flex-col md:flex'>
			<div className='space-y-0.5'>
				<div className='text-muted-foreground'>
					<TopBar />
				</div>
			</div>
			<div className='animate-in flex-1 flex flex-col gap-20 px-3 items-center'>
				<GridBackground />
			</div>
		</div>
	);
}
