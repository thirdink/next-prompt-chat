'use client';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { useChat, Message } from 'ai/react';
import { createClient } from '@/lib/supabase/client';

import { Button } from '@/components/ui/button';
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
import { Model } from '../data/models';
import PromptTopbar from '@/components/prompt-top-bar';
import { useToast } from '@/components/ui/use-toast';
import { chatService } from '@/service/client/chat-service';
import EditTabs from './edit-tabs-chat';

export const metadata: Metadata = {
	title: 'Playground',
	description: 'The OpenAI Playground built using the components.',
};

export default function ChatPage() {
	const supabase = createClient();

	const { toast } = useToast();
	const [chatId, setChatId] = useState(uuidv4());
	const [temperature, setTemperature] = useState([0.56]);
	const [topP, setTopP] = useState([0.9]);
	const [prompt, setPrompt] = useState('');
	const [output, setOutput] = useState<Array<Message>>([]);
	const [maxLength, setMaxLength] = useState([256]);
	const [history, setHistory] = useState([]);
	const [instructions, setInstructions] = useState('');
	const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

	const { messages, handleSubmit, setInput } = useChat({
		sendExtraMessageFields: true,
		onFinish: async (message) => {
			const { error } = await supabase.rpc('insert_chat_messages', {
				p_chat_id: chatId,
				max_length_tokens: 256,
				message_content: message.content,
				instructions,
				role: message.role,
				temp: temperature[0],
				top_p: topP[0],
			});
			if (error) {
				console.error('supabase error', error);
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong with supabase',
					description: error.message,
				});
			}
		},

		onError: (error) => {
			console.error('streaming routes error', error);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: error.message,
			});
		},

		body: {
			temperature: temperature[0],
			instructions,
			topP: topP[0],
			modelName: selectedModel.name,
			chatId,
		},
	});

	const handleSetInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPrompt(event.target.value);
		setInput(event.target.value);
	};

	const handleInstructionsChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setInstructions(event.target.value);
	};

	useEffect(() => {
		setInstructions(
			'you are a pirate named patchy, all responses must be extremely verbose and in pirate dialect'
		);
	}, []);

	// useEffect(() => {
	// 	console.log(messages);
	// }, [messages]);

	// useEffect(() => {
	// 	console.log('output ', output);
	// }, [output]);

	const getAllUserChatData = async () => {
		const { data, error } = await chatService.getUserData();
		if (error) {
			console.error('supabase error', error);
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with supabase',
				description: error.message,
			});
		}
		if (data) {
			setHistory(data as never[]);
		}
	};
	useEffect(() => {
		getAllUserChatData();
	}, []);
	useEffect(() => {
		console.log('history ', history);
	}, [history]);
	return (
		<>
			<div className='flex-col flex m-auto p-auto'>
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
				<Tabs defaultValue='edit' className='flex-1'>
					<div className='container  py-6  w-10/12'>
						<div className='grid items-stretch gap-6 md:grid-cols-[1fr_200px]'>
							<div className='hidden flex-col space-y-4 sm:flex md:order-2'>
								<ChatTab />
								<ModelSelector
									types={types}
									models={models}
									selectedModel={selectedModel}
									setSelectedModel={setSelectedModel}
								/>
								<TemperatureSelector
									defaultValue={temperature}
									setTemperature={setTemperature}
								/>
								<MaxLengthSelector
									defaultValue={maxLength}
									disabled
								/>
								<TopPSelector
									defaultValue={topP}
									setTopP={setTopP}
								/>
							</div>
							<div className='md:order-1'>
								<TabsContent
									value='edit'
									className='mt-0 border-0 p-0'
								>
									<EditTabs
										handleSubmit={handleSubmit}
										prompt={prompt}
										handleSetInput={handleSetInput}
										instructions={instructions}
										handleInstructionsChange={
											handleInstructionsChange
										}
										messages={messages}
									/>
								</TabsContent>
								<TabsContent
									value='complete'
									className='mt-0 border-0 p-0'
								>
									<div className='flex flex-col space-y-4'>
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
										<div className='grid grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1'>
											<Textarea
												placeholder="We're writing to [inset]. Congrats from OpenAI!"
												className='  min-h-[300px] lg:min-h-[500px] xl:min-h-[500px]'
											/>
											<div className='rounded-md border bg-muted'></div>
										</div>
										<div className='flex items-center space-x-2'>
											<Button type='submit'>
												Submit
											</Button>
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
