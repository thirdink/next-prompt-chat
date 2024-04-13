'use client';
import React, { useState } from 'react';
import Chat from '@/components/chat/chat';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'ai/react';
import { Model } from '@/data/models';
import { models } from '@/data/models';

const Page = ({ params }: { params: { slug: string } }) => {
	const [chatId, setChatId] = useState(uuidv4());
	const [temperature, setTemperature] = useState([0.56]);
	const [topP, setTopP] = useState([0.9]);
	const [prompt, setPrompt] = useState('');
	const [output, setOutput] = useState<Message[]>([]);
	const [maxLength, setMaxLength] = useState([256]);

	const [instructions, setInstructions] = useState('');
	const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
	return (
		<>
			<Chat
				chatId={chatId}
				temperature={temperature}
				setTemperature={setTemperature}
				topP={topP}
				setTopP={setTopP}
				prompt={prompt}
				setPrompt={setPrompt}
				output={output}
				setOutput={setOutput}
				maxLength={maxLength}
				setMaxLength={setMaxLength}
				instructions={instructions}
				setInstructions={setInstructions}
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
			/>
		</>
	);
};

export default Page;
