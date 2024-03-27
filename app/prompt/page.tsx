//TODO::
// api to prompt table and check if publish is true ✅
// if true  send prompt to client ✅
// render prompt on client
// format the UI so it matches the dashboard/prompt selectListDisplay
// add login button
import react from 'react';
import { promptService } from '@/service/client/prompt-service';

const Page = async ({
	searchParams,
}: {
	searchParams: { promptId: string };
}) => {
	const res = await promptService.getPublicPromptById(searchParams.promptId);

	return (
		<>
			<h1> Public Prompt Page</h1>
			<p> {searchParams.promptId}</p>
		</>
	);
};
export default Page;
