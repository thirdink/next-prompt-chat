'use client';
import React, { useEffect, useState } from 'react';

import { LibContainer } from '@/lib/utils';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';
import { promptService } from '@/service/client/prompt-service';
import PromptList from '@/components/prompt/prompt-list';

const PromptLib = () => {
	const [prompts, setPrompts] = useState<PromptProps[]>([]);
	const getPrompts = async () => {
		const getPrompt = await promptService.getAllPrompts();
		setPrompts(getPrompt);
	};

	useEffect(() => {
		getPrompts();
	}, []);

	return (
		<>
			<CreateNewPrompt />
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				{prompts &&
					prompts.map((prompt) => {
						return (
							<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
								<LibContainer>
									<PromptList prompt={prompt} />
								</LibContainer>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default PromptLib;
