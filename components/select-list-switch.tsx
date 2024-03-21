'use client';
import { useState, useEffect } from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { promptService } from '@/service/client/prompt-service';
import { toast } from '@/components/ui/use-toast';

const SelectListSwitch = ({ id }: { id: string }) => {
	const [published, setPublished] = useState(false);
	const [pending, setPending] = useState(false);

	const handleOnchange = () => {
		setPublished(!published);
	};

	const switchPublished = async () => {
		setPending(true);
		const { data, error } = await promptService.switchPublishPrompt({
			id,
			published,
		});
		if (data) {
			setPublished(data?.[0].published);
			if (data?.[0].published === true) {
				toast({
					title: 'Prompt Published',
					description: `Prompt has been published to the public`,
				});
			}
		}
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with the publish.',
				description: error.message,
			});
		}
		setPending(false);
	};

	useEffect(() => {
		switchPublished();
	}, [published]);
	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className='flex items-center space-x-2'>
						<Label htmlFor='airplane-mode'>Publish</Label>
						<Switch
							disabled={pending}
							checked={published}
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
