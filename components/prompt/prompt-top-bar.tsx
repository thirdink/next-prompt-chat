'use client';
import React, { useContext } from 'react';
import { PromptContext } from '@/data/context/PromptContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DrawingPinOutline } from '@/components/ui/icons';
import { handleMessageShortener } from '@/lib/utils';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';

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
			{prompt &&
				prompt.map((prompt) => {
					return (
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
					);
				})}
		</>
	);
};

export default PromptTopBar;
