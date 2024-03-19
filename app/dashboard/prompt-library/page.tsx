'use client';
import React, { Suspense } from 'react';
import SkeletonGrid from '@/components/skeleton-grid-ui';
import PromptLib from '@/components/prompt/prompt-lib';

function Page({ searchParams }: { searchParams: { promptId: string } }) {
	// check if searchParams.promptId is a string and call the api to get the prompt dispatch the selected chat action to the context

	return (
		<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl m-3'>
			<Suspense fallback={<SkeletonGrid />}>
				<PromptLib promptIdParams={searchParams.promptId} />
			</Suspense>
		</div>
	);
}

export default Page;
