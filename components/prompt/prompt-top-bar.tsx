'use client';
import React, { useContext } from 'react';
import { PromptContext } from '@/data/context/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DrawingPinOutline } from '@/components/ui/icons';
import { handleMessageShortener } from '@/lib/utils';

type PromptTopbarProps = {
	loading: boolean;
};

const PromptTopBar: React.FC<PromptTopbarProps> = ({ loading }) => {
	const [prompt, dispatch] = useContext(PromptContext);
	return (
		<>
			{prompt &&
				prompt.map((prompt) => {
					return (
						<div
							className='inline-block px-3 w-2/5'
							key={prompt.id}
						>
							<Card className='max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out'>
								<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
									<CardTitle className='text-sm font-medium'>
										{handleMessageShortener(prompt.title!)}
									</CardTitle>
									<DrawingPinOutline />
								</CardHeader>
								<CardContent>
									<div className=''>
										{handleMessageShortener(
											prompt.input!,
											52
										)}
									</div>
									{/* <p className='text-xs text-muted-foreground'>
									{prompt.footer}
								</p> */}
								</CardContent>
							</Card>
						</div>
					);
				})}
		</>
	);
};

export default PromptTopBar;
