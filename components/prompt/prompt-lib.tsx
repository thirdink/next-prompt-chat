'use client';
import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { promptService } from '@/service/client/prompt-service';
import { PromptContext } from '@/data/context/PromptContext';
import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';
import { unstable_noStore } from 'next/cache';

const PromptLib = () => {
	const [prompts, dispatch] = useContext(PromptContext);
	const [loading, setLoading] = useState(false);
	const [chatSelected, setChatSelected] = useState<selectedChat | null>(null);
	const getPrompts = async () => {
		unstable_noStore();
		setLoading(true);
		const getPrompt = await promptService.getAllPrompts();
		dispatch({ type: 'SET_PROMPTS', payload: getPrompt });
		setLoading(false);
	};
	const dispatchSelectedChat = () => {
		dispatch({ type: 'SELECTED_PROMPT', payload: chatSelected });
	};
	const handleDelete = async ({
		id,
		chat_id,
	}: {
		id?: string;
		chat_id?: string;
	}) => {
		// id from prompt lib component
		if (id) {
			console.log('id: ', id);
			await promptService.deletePrompt(id);
			getPrompts();
		}
	};

	useEffect(() => {
		getPrompts();
	}, []);

	useEffect(() => {
		dispatchSelectedChat();
	}, [chatSelected]);

	return (
		<>
			<CreateNewPrompt getPrompts={getPrompts} />
			<List
				items={prompts.prompt}
				chatSelected={chatSelected}
				setChatSelected={setChatSelected}
				handleDelete={handleDelete}
			/>
			{/* {loading ? (
				skeletonItems.map((item) => (
					<SkeletonGrid key={item.id} {...item} />
				))
			) : (
				<List
					items={prompts.prompt}
					chatSelected={chatSelected}
					setChatSelected={setChatSelected}
				/>
			)} */}
		</>
	);
};

export default PromptLib;
