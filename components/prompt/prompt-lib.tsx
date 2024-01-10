'use client';
import React, { useEffect, useState } from 'react';

import { LibContainer } from '@/lib/utils';
import CreateNewPrompt from '@/components/prompt/create-new-prompt';
import { promptService } from '@/service/client/prompt-service';

const PromptLib = () => {
	const getPrompts = async () => {
		const getPrompt = await promptService.getAllPrompts();
		console.log('getPrompt', getPrompt);
	};

	useEffect(() => {
		getPrompts();
	}, []);

	return (
		<>
		<CreateNewPrompt />
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 1</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 2</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 3</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 4</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 5</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 6</div>
					</LibContainer>
				</div>
			</div>
		</>
	);
};

export default PromptLib;
