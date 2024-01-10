'use client';
import PromptLib from '@/components/prompt/prompt-lib';
import { protectedComponent } from '@/service/client/auth-service';
function Page() {
	return <PromptLib />;
}

export default protectedComponent(Page);
