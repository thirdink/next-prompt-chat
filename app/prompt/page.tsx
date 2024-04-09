//TODO::
// api to prompt table and check if publish is true ✅
// if true  send prompt to client ✅
// render prompt on client ✅
// format the UI so it matches the dashboard/prompt selectListDisplay ✅
// add login button
import react from 'react';
import { promptService } from '@/service/client/prompt-service';
import { SelectedListDisplay } from '@/components/selected-list-display';
import { selectedChat } from '@/lib/types/chat/chat-lib';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { PostgrestError } from '@supabase/supabase-js';
import { TooltipProvider } from '@/components/ui/tooltip';
import Footer from '@/components/footer';

const Page = async ({
	searchParams,
}: {
	searchParams: { promptId: string };
}) => {
	const { selectedChat, error } = (await promptService.getPublicPromptById(
		searchParams.promptId
	)) as { selectedChat: selectedChat | null; error: PostgrestError | null };

	return (
		<TooltipProvider delayDuration={0}>
			<h1> Public Prompt Page</h1>
			<p> {searchParams.promptId}</p>
			{selectedChat && (
				<>
					<SelectedListDisplay item={selectedChat} />
				</>
			)}
			<Footer />
		</TooltipProvider>
	);
};
export default Page;
