import { Metadata } from 'next';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { CodeViewer } from '@/components/code-viewer';
import { MaxLengthSelector } from '@/components/maxlength-selector';
import { ModelSelector } from '@/components/model-selector';
import { PresetActions } from '@/components/preset-actions';
import { PresetSave } from '@/components/preset-save';
import { PresetSelector } from '@/components/preset-selector';
import { PresetShare } from '@/components/preset-share';
import { TemperatureSelector } from '@/components/temperature-selector';
import { TopPSelector } from '@/components/top-p-selector';
import { models, types } from '@/data/models';
import { presets } from '@/data/presets';
import ChatTab from './ui/chat-tab';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DrawingPinOutline } from './ui/svg';

export const metadata: Metadata = {
	title: 'Playground',
	description: 'The OpenAI Playground built using the components.',
};

type promptType = {
	key: string;
	title: string;
	body: string;
	footer: string;
};

export default function ChatPage() {
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

	const PromptTopbar = () => {
		return (
			<>
				{PromptData.map((prompt) => {
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
	return (
		<>
			<div className='h-full flex-col flex m-auto p-auto'>
				<div className='flex overflow-x-scroll p-5 hide-scroll-bar'>
					<div className='flex flex-nowrap ml-10 '>
						<PromptTopbar />
					</div>
				</div>
				<Separator />
				<div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 w-11/12'>
					<h2 className='text-lg font-semibold whitespace-nowrap'>
						Prompt Playground
					</h2>
					<div className='ml-auto flex w-full space-x-2 sm:justify-end'>
						<PresetSelector presets={presets} />
						<PresetSave />
						<div className='hidden space-x-2 md:flex'>
							<CodeViewer />
							<PresetShare />
						</div>
						<PresetActions />
					</div>
				</div>
				<Separator />
				<Tabs defaultValue='complete' className='flex-1'>
					<div className='container h-full py-6 w-11/12'>
						<div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]'>
							<div className='hidden flex-col space-y-4 sm:flex md:order-2'>
								<ChatTab />
								<ModelSelector types={types} models={models} />
								<TemperatureSelector defaultValue={[0.56]} />
								<MaxLengthSelector defaultValue={[256]} />
								<TopPSelector defaultValue={[0.9]} />
							</div>
							<div className='md:order-1'>
								<TabsContent
									value='complete'
									className='mt-0 border-0 p-0'
								>
									<div className='flex h-full flex-col space-y-4'>
										<Textarea
											placeholder='Write a tagline for an ice cream shop'
											className='min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[500px]'
										/>
										<div className='flex items-center space-x-2'>
											<Button>Submit</Button>
											<Button variant='secondary'>
												<span className='sr-only'>
													Show history
												</span>
												<CounterClockwiseClockIcon className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</TabsContent>
								<TabsContent
									value='insert'
									className='mt-0 border-0 p-0'
								>
									<div className='flex flex-col space-y-4'>
										<div className='grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1'>
											<Textarea
												placeholder="We're writing to [inset]. Congrats from OpenAI!"
												className='h-full min-h-[300px] lg:min-h-[500px] xl:min-h-[500px]'
											/>
											<div className='rounded-md border bg-muted'></div>
										</div>
										<div className='flex items-center space-x-2'>
											<Button>Submit</Button>
											<Button variant='secondary'>
												<span className='sr-only'>
													Show history
												</span>
												<CounterClockwiseClockIcon className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</TabsContent>
								<TabsContent
									value='edit'
									className='mt-0 border-0 p-0'
								>
									<div className='flex flex-col space-y-4'>
										<div className='grid h-full gap-6 lg:grid-cols-2'>
											<div className='flex flex-col space-y-4'>
												<div className='flex flex-1 flex-col space-y-2'>
													<Label htmlFor='input'>
														Input
													</Label>
													<Textarea
														id='input'
														placeholder='We is going to the market.'
														className='flex-1 lg:min-h-[381px]'
													/>
												</div>
												<div className='flex flex-col space-y-2'>
													<Label htmlFor='instructions'>
														Instructions
													</Label>
													<Textarea
														id='instructions'
														placeholder='Fix the grammar.'
													/>
												</div>
											</div>
											<div className='mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[500px]' />
										</div>
										<div className='flex items-center space-x-2'>
											<Button>Submit</Button>
											<Button variant='secondary'>
												<span className='sr-only'>
													Show history
												</span>
												<CounterClockwiseClockIcon className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</TabsContent>
							</div>
						</div>
					</div>
				</Tabs>
			</div>
		</>
	);
}
