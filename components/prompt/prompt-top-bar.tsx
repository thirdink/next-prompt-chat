'use client';
import React, { useContext, Suspense } from 'react';
import { PromptContext } from '@/data/context/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkeletonGrid from '@/components/skeleton-grid-ui';
import { handleMessageShortener } from '@/lib/utils';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import Link from 'next/link';

type PromptTopbarProps = {
	loading: boolean;
	handlePromptTopBar: (prompt: PromptProps) => void;
};

const PromptTopBar: React.FC<PromptTopbarProps> = ({
	loading,
	handlePromptTopBar,
}) => {
	const [prompt, dispatch] = useContext(PromptContext);

	return (
		<>
			{prompt.prompt && prompt.prompt.length === 0 ? (
				<Link
					href='/dashboard/prompt-library'
					className='flex flex-col items-start gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent'
				>
					<div className='inline-block'>
						<Card className='max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out h-[175px]  w-[145px]'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 '>
								<CardTitle className='text-sm font-medium'>
									No Prompts Yet
								</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-row items-center justify-between space-y-0 overflow-auto'>
								<p className='hyphens-auto whitespace-normal align-middle text-clip text-start antialiased overflow-hidden'>
									click here! to add new prompt.prompt
								</p>
							</CardContent>
						</Card>
					</div>
				</Link>
			) : (
				prompt.prompt.map((prompt) => {
					return (
						<Suspense fallback={<SkeletonGrid />} key={prompt.id}>
							<button
								key={prompt.id}
								className='flex flex-col items-start gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent '
								onClick={() => handlePromptTopBar(prompt)}
							>
								<div className='inline-block'>
									<Card className='max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out h-[175px]  w-[145px]'>
										<CardHeader className='flex flex-row items-center justify-between space-y-0 '>
											<CardTitle className='text-sm font-medium'>
												{handleMessageShortener(
													prompt.title!,
													20
												)}
											</CardTitle>
											{/* <DrawingPinOutline /> */}
										</CardHeader>
										<CardContent className='flex flex-row items-center justify-between space-y-0 overflow-auto'>
											<p className='hyphens-auto whitespace-normal align-middle text-clip text-start antialiased overflow-hidden'>
												{handleMessageShortener(
													prompt.input!,
													52
												)}
											</p>
										</CardContent>
									</Card>
								</div>
							</button>
						</Suspense>
					);
				})
			)}
		</>
	);
};

export default PromptTopBar;
