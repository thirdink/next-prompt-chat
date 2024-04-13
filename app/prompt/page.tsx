// api to prompt table and check if publish is true ✅
// if true  send prompt to client ✅
// render prompt on client ✅
// format the UI so it matches the dashboard/prompt selectListDisplay ✅
// add login button to the top bar ✅
import react from 'react';
import Footer from '@/components/footer';
import TopBar from '@/components/header/top-bar';
import { promptService } from '@/service/client/prompt-service';
import { SelectedListDisplay } from '@/components/selected-list-display';
import { selectedChat } from '@/lib/types/chat/chat-lib';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { PostgrestError } from '@supabase/supabase-js';
import { TooltipProvider } from '@/components/ui/tooltip';

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
			<div className='flex-col md:flex h-[100vh]'>
				<div className='space-y-0.5'>
					<div className='text-muted-foreground'>
						<TopBar />
					</div>
				</div>

				{selectedChat !== null ? (
					<>
						<SelectedListDisplay item={selectedChat} />
					</>
				) : (
					<div className='flex flex-row container'>
						<div className='animate-in flex-1 flex flex-col gap-20 px-3 items-center container'>
							<h2> This Prompt is not made public</h2>
						</div>
					</div>
				)}
				<Footer />
			</div>
		</TooltipProvider>
	);
};
export default Page;
