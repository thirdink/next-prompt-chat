'use client';
import React, { useEffect, useReducer, useState } from 'react';

import { LibContainer } from '@/lib/utils';

import SkeletonGrid from '@/components/skeleton-grid-ui';
import { promptService } from '@/service/client/prompt-service';
import PromptGrid from '@/components/prompt/prompt-list';
import { reducer } from '@/data/reducer';

const PromptLib = () => {
	const [prompts, dispatch] = useReducer(reducer, []);
	const [loading, setLoading] = useState(false);
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
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				{loading
					? skeletonItems.map((item) => <SkeletonGrid {...item} />)
					: prompts &&
					  prompts.map((prompt) => {
							return (
								<div
									key={prompt.id}
									className='col-span-2 grid items-start gap-6 lg:col-span-1'
								>
									<LibContainer>
										<PromptGrid prompt={prompt} />
									</LibContainer>
								</div>
							);
					  })}
			</div>
		</>
	);
};

export default PromptLib;
