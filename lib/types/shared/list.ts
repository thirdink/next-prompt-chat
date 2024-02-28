import {  Dispatch, SetStateAction } from 'react';
import type {
	chatMessages,
	selectedChat
} from '@/lib/types/chat/chat-lib';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { HandleDeleteParams } from '@/lib/types/prompt/prompt-lib';

export type ListProps = {
	items?: chatMessages[] | PromptProps[] | undefined;
	chatSelected: selectedChat | undefined | null;
	setChatSelected: Dispatch<SetStateAction<selectedChat | null>>;
	handleDelete: ({ id, chat_id }: HandleDeleteParams) => void;
};
export type ListInternal = {
	item: chatMessages | PromptProps;
	chatSelected: selectedChat | undefined;
	setChatSelected: Dispatch<SetStateAction<selectedChat | null>>;
	handleDelete: ({ id, chat_id }: HandleDeleteParams) => void;
};