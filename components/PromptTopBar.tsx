'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DrawingPinOutline } from './ui/svg';

type promptType = {
	key: string;
	title: string;
	body: string;
	footer: string;
};

const PromptData: Array<promptType> = [
	{
		key: '1',
		title: 'Prompt Title 1',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '2',
		title: 'Prompt Title 2',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '3',
		title: 'Prompt Title 3',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '4',
		title: 'Prompt Title 4',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '5',
		title: 'Prompt Title 5',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '6',
		title: 'Prompt Title 6',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '7',
		title: 'Prompt Title 7',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '8',
		title: 'Prompt Title 8',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '9',
		title: 'Prompt Title 9',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '10',
		title: 'Prompt Title 10',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '11',
		title: 'Prompt Title 11',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '12',
		title: 'Prompt Title 12',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '13',
		title: 'Prompt Title 13',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '14',
		title: 'Prompt Title 14',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '15',
		title: 'Prompt Title 15',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
	{
		key: '16',
		title: 'Prompt Title 16',
		body: 'Prompt Body',
		footer: 'Prompt Footer',
	},
];

const PromptTopBar = () => {
	const [prompt, setPrompt] = useState(PromptData);
	return (
		<>
			{prompt.map((prompt) => {
				return (
					<div className='inline-block px-3' key={prompt.key}>
						<Card className='max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									{prompt.title}
								</CardTitle>
								<DrawingPinOutline />
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>
									{prompt.body}
								</div>
								<p className='text-xs text-muted-foreground'>
									{prompt.footer}
								</p>
							</CardContent>
						</Card>
					</div>
				);
			})}
		</>
	);
};

export default PromptTopBar;
