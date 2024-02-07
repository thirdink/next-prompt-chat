'use client';
import React, { useEffect, useState, useContext } from 'react';

import { LibContainer } from '@/lib/utils';

import SkeletonGrid from '@/components/skeleton-grid-ui';
import { promptService } from '@/service/client/prompt-service';
import PromptGrid from '@/components/prompt/prompt-grid';
import { PromptContext } from '@/data/context/PromptContext';
import type { chatMessages, selectedChat } from '@/lib/types/chat/chat-lib';
import List from '@/components/list';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';

const PromptLib = () => {
	const [prompts, dispatch] = useContext(PromptContext);
	const [loading, setLoading] = useState(false);
	const [chatSelected, setChatSelected] = useState<selectedChat>();
	const [skeletonItems] = useState([
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
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
			<div className=''>
				{loading ? (
					skeletonItems.map((item) => <SkeletonGrid {...item} />)
				) : (
					<List
						items={prompts}
						chatSelected={chatSelected}
						setChatSelected={setChatSelected}
					/>
				)}
			</div>
		</>
	);
};

export default PromptLib;
