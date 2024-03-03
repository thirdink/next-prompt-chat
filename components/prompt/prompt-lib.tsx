'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useQueryState } from 'nuqs';

import { promptService } from '@/service/client/prompt-service';
import { PromptContext } from '@/data/context/PromptContext';
import type { selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';
import { type HandleDeleteParams } from '@/lib/types/prompt/prompt-lib';
import { toast } from '@/components/ui/use-toast';

const PromptLib = ({ promptIdParams }: { promptIdParams: string }) => {
	const [promptId, setPromptId] = useQueryState('promptId');
	const [prompts, dispatch] = useContext(PromptContext);
	const [loading, setLoading] = useState(false);
	const [chatSelected, setChatSelected] = useState<selectedChat | null>(null);
	const getPrompts = async () => {
		// unstable_noStore();
		setLoading(true);
		const getPrompt = await promptService.getAllPrompts();
		dispatch({ type: 'SET_PROMPTS', payload: getPrompt });
		setLoading(false);
	};
	const dispatchSelectedChat = () => {
		if (chatSelected?.selectedId) {
			setPromptId(chatSelected?.selectedId);
		}
		dispatch({ type: 'SELECTED_PROMPT', payload: chatSelected });
	};

	const handleDelete = async (params: HandleDeleteParams) => {
		if (params.id) {
			console.log('delete id: ', params.id);
			const result = await promptService.deletePrompt(params.id);
			if (result?.status === 200) {
				toast({
					title: 'Prompt Deleted',
					description: 'Prompt has been deleted',
				});
				getPrompts();
			}
			if (result?.status === 500) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong with deleting the prompt.',
					description: JSON.stringify(result?.body),
				});
			}
		}
	};

	const fetchParamPromptId = async (promptIdParams: string) => {
		if (promptIdParams !== undefined && promptIdParams !== '') {
			// Call the API to get the prompt
			const result = await promptService.getPromptById(promptIdParams);

			if (result) {
				setChatSelected(result);
			}
			if (result == undefined) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong with fetching the prompt.',
					description: 'Please check the link and try again.',
				});
			}
		}
	};

	useEffect(() => {
		fetchParamPromptId(promptIdParams);
	}, [promptIdParams]);

	useEffect(() => {
		getPrompts();
	}, []);

	useEffect(() => {
		dispatchSelectedChat();
	}, [chatSelected]);
	//  whole component in is a suspense so no need to check for loading
	return (
		<>
			<CreateNewPrompt getPrompts={getPrompts} />
			<List
				items={prompts.prompt}
				chatSelected={chatSelected}
				setChatSelected={setChatSelected}
				handleDelete={handleDelete}
			/>
		</>
	);
};

export default PromptLib;
