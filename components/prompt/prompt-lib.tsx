'use client';
import React, { useEffect, useReducer } from 'react';

import { LibContainer } from '@/lib/utils';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';
import { promptService } from '@/service/client/prompt-service';
import PromptGrid from '@/components/prompt/prompt-list';
import {reducer} from '@/data/reducer';

const PromptLib = () => {
	const [prompts, dispatch] = useReducer(reducer, []);

	const getPrompts = async () => {
		const getPrompt = await promptService.getAllPrompts();
		dispatch({ type: 'SET_PROMPTS', payload: getPrompt });
	};

	useEffect(() => {
		getPrompts();
	}, []);

	return (
		<>
			<CreateNewPrompt getPrompts={getPrompts}/>
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				{prompts &&
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
