'use client';
import React, { Suspense } from 'react';
import SkeletonGrid from '@/components/skeleton-grid-ui';
import PromptLib from '@/components/prompt/prompt-lib';
import { protectedComponent } from '@/service/client/auth-service';
function Page() {
	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl m-3'>
			<Suspense fallback={<SkeletonGrid />}>
				<PromptLib />
			</Suspense>
		</div>
	);
}

export default protectedComponent(Page);
