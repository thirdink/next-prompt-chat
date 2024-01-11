import { parseISO, format } from 'date-fns';

export function Date({ dateString }: { dateString: string }) {
	if(dateString){
		const date = parseISO(dateString);
		return (
			<time dateTime={dateString}>
				{format(date, 'LLLL d, yyyy hh:mm a')}
			</time>
		);
	}
}
