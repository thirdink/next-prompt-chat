import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleMessageShortener = (currentMessage: string, maxSubString?:number): string => {
	// create a new string that takes currentMessageContent and just returns the first 52 characters with ... at the end
	if (currentMessage.length > 52) {
		const shortMessage = currentMessage.substring(0, maxSubString?maxSubString:52);
		return `${shortMessage}...`;
	}
	return currentMessage;
};

export function LibContainer({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'flex items-center justify-center [&>div]:w-full',
				className
			)}
			{...props}
		/>
	);
}
