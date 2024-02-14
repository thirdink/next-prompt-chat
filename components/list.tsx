import React, { ComponentProps, Dispatch, SetStateAction } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { cn } from '@/lib/utils';
import type {
	chatMessages,
	selectedChat,
	ChatMessagesFromUser,
} from '@/lib/types/chat/chat-lib';
type ListProps = {
	items?: chatMessages[] | PromptProps[] | undefined;
	chatSelected: selectedChat | undefined | null;
	setChatSelected: Dispatch<SetStateAction<selectedChat | null>>;
};
type ListInternal = {
	item: chatMessages | PromptProps;
	chatSelected: selectedChat | undefined;
	setChatSelected: Dispatch<SetStateAction<selectedChat | null>>;
};

const ListInternal: React.FC<ListInternal> = ({
	item,
	chatSelected,
	setChatSelected,
}) => {
	return (
		<button
			key={('chat_id' in item ? item.chat_id : item.id) as React.Key}
			className={cn(
				'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
				chatSelected?.selectedId ===
					('chat_id' in item ? item.chat_id : item.id) && 'bg-muted'
			)}
			onClick={() =>
				setChatSelected({
					chatMessages: item,
					selectedId: ('chat_id' in item
						? item.chat_id
						: item.id) as string,
				})
			}
		>
			<div className='flex w-full flex-col gap-1'>
				<div className='flex items-center'>
					<div className='flex items-center gap-2'>
						<div className='font-semibold'>{item.title}</div>
					</div>
					<div
						className={cn(
							'ml-auto text-xs',
							chatSelected?.selectedId ===
								('chat_id' in item ? item.chat_id : item.id)
								? 'text-foreground'
								: 'text-muted-foreground'
						)}
					>
						{formatDistanceToNow(
							'chat_created_at' in item
								? new Date(item.chat_created_at)
								: new Date(item.created_at),
							{
								addSuffix: true,
							}
						)}
					</div>
				</div>
			</div>
			<div className='line-clamp-2 text-xs text-muted-foreground'>
				{String(
					('messages' in item
						? item.messages[0].message_content
						: item.input) as string
				).substring(0, 300)}
			</div>
		</button>
	);
};

const List: React.FC<ListProps> = ({
	items,
	chatSelected,
	setChatSelected,
}) => {
	return (
		<ScrollArea className='h-screen'>
			<div className='flex flex-col gap-2 p-4 pt-0'>
				{items &&
					items.map((item) => {
						if ('chat_id' in item) {
							const chatMessage = item as chatMessages;
							// Render chatMessage
							return (
								<ListInternal
									key={item.chat_id}
									item={item}
									chatSelected={chatSelected!}
									setChatSelected={setChatSelected}
								/>
							);
						}

						if ('id' in item) {
							const promptProp = item as PromptProps;
							// Render promptProp
							return (
								<ListInternal
									key={item.id}
									item={item}
									chatSelected={chatSelected!}
									setChatSelected={setChatSelected}
								/>
							);
						}

						return null;
					})}
			</div>
		</ScrollArea>
	);
};
function getBadgeVariantFromLabel(
	label: string
): ComponentProps<typeof Badge>['variant'] {
	if (['work'].includes(label.toLowerCase())) {
		return 'default';
	}

	if (['personal'].includes(label.toLowerCase())) {
		return 'outline';
	}

	return 'secondary';
}

export default List;
