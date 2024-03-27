'use client';
import { useState, useEffect, useContext } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { PromptContext } from '@/data/context/PromptContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { promptService } from '@/service/client/prompt-service';
import { toast } from '@/components/ui/use-toast';
import { unstable_noStore } from 'next/cache';

const SelectListSwitch = ({
	id,
	published,
}: {
	id: string;
	published: boolean;
}) => {
	unstable_noStore();
	const [pending, setPending] = useState(false);
	const [prompts, dispatch] = useContext(PromptContext);
	const [publicPublished, setPublicPublished] = useState(false);

	const switchPublished = async () => {
		setPending(true);
		const { selectedChat, error } = await promptService.switchPublishPrompt(
			{
				id,
				published: !publicPublished,
			}
		);
		if (selectedChat !== null) {
			dispatch({ type: 'SELECTED_PROMPT', payload: selectedChat });
			const getPrompt = await promptService.getAllPrompts();
			dispatch({ type: 'SET_PROMPTS', payload: getPrompt });
			if (
				'id' in selectedChat?.chatMessages
					? selectedChat?.chatMessages.published === true
					: null
			) {
				toast({
					title: 'Prompt Updated',
					description: 'Prompt has been updated',
				});
			}
		}
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with updating the prompt.',
				description: error?.message,
			});
		}
		setPending(false);
	};

	const handleOnchange = () => {
		switchPublished();
	};

	useEffect(() => {
		setPublicPublished(published);
	}, [published]);

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className='flex items-center space-x-2'>
						<Label htmlFor='airplane-mode'>Publish</Label>
						<Switch
							disabled={pending}
							checked={publicPublished}
							onCheckedChange={handleOnchange}
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>publish to the public</TooltipContent>
			</Tooltip>
		</>
	);
};

export default SelectListSwitch;
