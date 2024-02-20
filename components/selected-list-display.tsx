import React from 'react';
import { selectedChat, chatMessages } from '@/lib/types/chat/chat-lib';
import { format } from 'date-fns/format';
import { ChatList } from '@/components/chat/chat-list';
import { Separator } from '@/components/ui/separator';

interface SelectedListDisplayProps {
	item: selectedChat | null;
}

export function SelectedListDisplay({ item }: SelectedListDisplayProps) {
	const today = new Date();

	return (
		<div className='flex h-full flex-col'>
			<Separator />
			{item ? (
				<div className='flex flex-col'>
					<div className='flex items-start p-4'>
						<div className='flex items-start gap-4 text-sm'>
							{/* <Avatar>
                <AvatarImage alt={item.name} />
                <AvatarFallback>
                  {item.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar> */}
							<div className='grid gap-1'>
								<div className='font-semibold'>
									{item.chatMessages.title}
								</div>
							</div>
						</div>
						{item.chatMessages && (
							<div className='ml-auto text-xs text-muted-foreground'>
								{format(
									new Date(
										'created_at' in item.chatMessages
											? item.chatMessages.created_at
											: item.chatMessages.chat_created_at
									),
									'PPpp'
								)}
							</div>
						)}
					</div>
					<Separator />
					<div className=' whitespace-pre-wrap p-4 text-sm'>
						{item.chatMessages && 'id' in item.chatMessages
							? item.chatMessages.input
							: item.chatMessages.messages && (
									<>
										<ChatList
											messages={
												item.chatMessages.messages
											}
										/>
									</>
							  )}
					</div>
					{/* <Separator className='mt-auto' />
					<div className='p-4'>
						<form>
							<div className='grid gap-4'>
								<Textarea
									className='p-4'
									placeholder='Type your message here'
								/>
								<div className='flex items-center'>
									<Label
										htmlFor='mute'
										className='flex items-center gap-2 text-xs font-normal'
									>
										<Switch
											id='mute'
											aria-label='Mute thread'
										/>{' '}
										Mute this thread
									</Label>
									<Button
										onClick={(e) => e.preventDefault()}
										size='sm'
										className='ml-auto'
									>
										Send
									</Button>
								</div>
							</div>
						</form>
					</div> */}
				</div>
			) : (
				<div className='p-8 text-center text-muted-foreground'>
					No message selected
				</div>
			)}
		</div>
	);
}
