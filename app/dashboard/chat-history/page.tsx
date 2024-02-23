import ChatHistory from '@/components/chat/chat-history';
import { Suspense } from 'react';

const Page = () => {
	return (
		<>
			<Suspense fallback={<h2>Loading...</h2>}>
				<ChatHistory />
			</Suspense>
		</>
	);
};
export default Page;
