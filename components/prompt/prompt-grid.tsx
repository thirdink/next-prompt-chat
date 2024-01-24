'use client';
import { CircleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Date } from '@/components/date';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { Separator } from '@/components/ui/separator';
import { handleMessageShortener } from '@/lib/utils';

const PromptGrid = ({ prompt }: { prompt: PromptProps }) => {
	return (
		<Card key={prompt.id}>
			<CardHeader className='grid items-center gap-4 space-y-0 '>
				<div className='space-y-1 items-center'>
					<CardTitle>{prompt.title}</CardTitle>
					<CardDescription>
						{handleMessageShortener(prompt.input!, 240)}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className='flex space-x-4 text-sm text-muted-foreground'>
					<div className='flex items-center'>
						{prompt.categories ? (
							<>
								<CircleIcon className='mr-1 h-3 w-3 fill-sky-400 text-sky-400' />
								{prompt.categories.name}
							</>
						) : null}
					</div>
					{/* <div className='flex items-center'>
						<StarIcon className='mr-1 h-3 w-3' />
						20k
					</div> */}
					<div className='items-end'>
						<Date dateString={prompt.created_at} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PromptGrid;
