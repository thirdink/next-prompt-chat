'use client';
import React, { Suspense } from 'react';
import { selectedChat, chatMessages } from '@/lib/types/chat/chat-lib';
import { format } from 'date-fns/format';
import { usePathname } from 'next/navigation';
import { ChatList } from '@/components/chat/chat-list';
import { Separator } from '@/components/ui/separator';
import SelectListSwitch from '@/components/select-list-switch';
import { isPromptLibraryLink } from '@/lib/utils';

interface SelectedListDisplayProps {
	item: selectedChat | null;
}

export function SelectedListDisplay({ item }: SelectedListDisplayProps) {
	const pathname = usePathname();

	return (
		<div className='flex h-full flex-col'>
			<Separator />
			{item ? (
				<div className='flex flex-col'>
					{item.chatMessages &&
						isPromptLibraryLink(pathname) &&
						'id' in item.chatMessages && (
							<>
								<div className='flex p-4 justify-end'>
									<Suspense fallback='loading...'>
										<SelectListSwitch
											id={item.chatMessages.id}
											published={
												item.chatMessages.published
											}
										/>
									</Suspense>
								</div>
								<Separator />
							</>
						)}
					<div className='flex items-start p-4'>
						<div className='flex items-start gap-4 text-sm'>
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
				</div>
			) : (
				<div className='p-8 text-center text-muted-foreground'>
					No message selected
				</div>
			)}
		</div>
	);
}
