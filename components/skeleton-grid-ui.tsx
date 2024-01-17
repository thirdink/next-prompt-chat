import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LibContainer } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SkeletonGrid = (item: { id: number }) => {
	return (
		<div
			key={item.id}
			className='col-span-2 grid items-start gap-6 lg:col-span-1'
		>
			<LibContainer>
				<Card>
					<CardHeader className='grid items-center gap-4 space-y-0 '>
						<div className='space-y-1 items-center'>
							<Skeleton className='w-[100px] h-[20px] rounded-full' />
							<Skeleton className='w-[100px] h-[20px] rounded-full' />
						</div>
					</CardHeader>
					<CardContent>
						<div className='flex space-x-4 text-sm text-muted-foreground'>
							<div className='flex items-center'>
								<Skeleton className='w-[100px] h-[20px] rounded-full' />
							</div>
							<div className='items-end'>
								<Skeleton className='w-[100px] h-[20px] rounded-full' />
							</div>
						</div>
					</CardContent>
				</Card>
			</LibContainer>
		</div>
	);
};
export default SkeletonGrid;
