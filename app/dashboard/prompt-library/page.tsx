'use client';
import PromptLib from '@/components/prompt/prompt-lib';
import { protectedComponent } from '@/service/client/auth-service';
function Page() {
	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl m-3'>
			<PromptLib />
		</div>
	);
}

export default protectedComponent(Page);
