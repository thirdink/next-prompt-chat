import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleMessageForTitle = (currentMessage: string): string => {
	// create a new string that takes currentMessageContent and just returns the first 52 characters with ... at the end
	if (currentMessage.length > 52) {
		const shortMessage = currentMessage.substring(0, 52);
		return `${shortMessage}...`;
	}
	return currentMessage;
};
