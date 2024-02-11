'use client';
import React, { useEffect, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LibContainer } from '@/lib/utils';

import SkeletonGrid from '@/components/skeleton-grid-ui';
import { promptService } from '@/service/client/prompt-service';
import { PromptContext } from '@/data/context/PromptContext';
import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';

const PromptLib = () => {
	const [prompts, dispatch] = useContext(PromptContext);
	const [loading, setLoading] = useState(false);
	const [chatSelected, setChatSelected] = useState<selectedChat>();
	const [skeletonItems] = useState([
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
	]);

	const getPrompts = async () => {
		setLoading(true);
		const getPrompt = await promptService.getAllPrompts();
		dispatch({ type: 'SET_PROMPTS', payload: getPrompt });
		setLoading(false);
	};

	useEffect(() => {
		getPrompts();
	}, []);

	return (
		<>
			<CreateNewPrompt getPrompts={getPrompts} />
			{loading ? (
				skeletonItems.map((item) => (
					<SkeletonGrid key={item.id} {...item} />
				))
			) : (
				<List
					items={prompts.prompt}
					chatSelected={chatSelected}
					setChatSelected={setChatSelected}
				/>
			)}
		</>
	);
};

export default PromptLib;
