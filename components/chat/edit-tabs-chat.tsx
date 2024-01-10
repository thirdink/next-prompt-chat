'use client';

import React from 'react';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChatList } from '@/components/chat/chat-list';
import { Button } from '@/components/ui/button';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { Message } from 'ai';

type EditTabsProps = {
	handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
	prompt: string;
	handleSetInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	instructions: string;
	handleInstructionsChange: (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => void;
	messages: Array<Message>;
};

const EditTabs: React.FC<EditTabsProps> = ({
	handleSubmit,
	prompt,
	handleSetInput,
	instructions,
	handleInstructionsChange,
	messages,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col space-y-4'>
				<div className='grid gap-6 lg:grid-cols-2 '>
					<div className='flex flex-col space-y-4 '>
						<div className='flex flex-1 flex-col space-y-2'>
							<Label htmlFor='input'>Input</Label>
							<Textarea
								id='input'
								placeholder='Create a paragraph on samurai in Japan in the 1800s.'
								className='flex-1 lg:min-h-[381px]'
								value={prompt}
								onChange={handleSetInput}
							/>
						</div>
						<div className='flex flex-col space-y-2'>
							<Label htmlFor='instructions'>Instructions</Label>
							<Textarea
								id='instructions'
								placeholder={instructions}
								value={instructions}
								onChange={handleInstructionsChange}
							/>
						</div>
					</div>
					<div className='flex mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[500px] max-h-[700px] overflow-auto'>
						{messages.length ? (
							<>
								<ChatList messages={messages} />
							</>
						) : null}
					</div>
				</div>
				<div className='flex items-center space-x-2'>
					<Button type='submit'>Submit</Button>
					<Button variant='secondary' disabled>
						<span className='sr-only'>Show history</span>
						<CounterClockwiseClockIcon className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</form>
	);
};
export default EditTabs;
