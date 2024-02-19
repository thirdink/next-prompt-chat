import React, { useContext, useEffect } from 'react';
import { PromptContext } from '@/data/context/PromptContext';
import { selectedChat, chatMessages } from '@/lib/types/chat/chat-lib';
import { format } from 'date-fns/format';
import nextSaturday from 'date-fns/nextSaturday';
import {
	Archive,
	ArchiveX,
	Forward,
	MoreVertical,
	Reply,
	ReplyAll,
	Trash2,
} from 'lucide-react';

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { ChatList } from '@/components/chat/chat-list';
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Mail } from '@/data/models';

interface SelectedListDisplayProps {
	item: selectedChat | null;
}

export function SelectedListDisplay({ item }: SelectedListDisplayProps) {
	const today = new Date();

	return (
		<div className='flex h-full flex-col'>
			<div className='flex items-center p-2'>
				{/* <div className='flex items-center gap-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<Archive className='h-4 w-4' />
								<span className='sr-only'>Archive</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Archive</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<ArchiveX className='h-4 w-4' />
								<span className='sr-only'>Move to junk</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move to junk</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<Trash2 className='h-4 w-4' />
								<span className='sr-only'>Move to trash</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move to trash</TooltipContent>
					</Tooltip>
					<Separator orientation='vertical' className='mx-1 h-6' />
				</div>
				<div className='ml-auto flex items-center gap-2'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<Reply className='h-4 w-4' />
								<span className='sr-only'>Reply</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Reply</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<ReplyAll className='h-4 w-4' />
								<span className='sr-only'>Reply all</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Reply all</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								disabled={!item}
							>
								<Forward className='h-4 w-4' />
								<span className='sr-only'>Forward</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Forward</TooltipContent>
					</Tooltip>
				</div> */}
				{/* <Separator orientation='vertical' className='mx-2 h-6' />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' disabled={!item}>
							<MoreVertical className='h-4 w-4' />
							<span className='sr-only'>More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem>Mark as unread</DropdownMenuItem>
						<DropdownMenuItem>Star thread</DropdownMenuItem>
						<DropdownMenuItem>Add label</DropdownMenuItem>
						<DropdownMenuItem>Mute thread</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}
			</div>
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
