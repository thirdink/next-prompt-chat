import z, { string } from 'zod';
import {
	QueryResult,
	QueryData,
	QueryError,
	PostgrestError,
} from '@supabase/supabase-js';
import type { selectedChat } from '@/lib/types/chat/chat-lib';
import { createClient } from '@/lib/supabase/client';
import { promptSchema, PromptProps } from '@/lib/types/prompt/prompt-lib';
import { toast } from '@/components/ui/use-toast';
import { unstable_noStore } from 'next/cache';

const supabase = createClient();

const promptFormSchema = promptSchema.promptFormSchema;

const getPromptCategories = async () => {
	const promptCategoriesQuery = supabase.from('categories').select('*');

	type promptCategories = QueryData<typeof promptCategoriesQuery>;

	const { data, error } = await promptCategoriesQuery;

	const promptCategories: promptCategories = data || [];

	return { promptCategories, error };
};

const getAllPrompts = async () => {
	try {
		const getPrompts = await fetch('/api/prompt', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return getPrompts.json();
	} catch (e: any) {
		console.error('getAllPrompts Error', e);
	}
};

const postPrompt = async (promptInput: z.infer<typeof promptFormSchema>) => {
	try {
		const postPrompt = await fetch('/api/prompt', {
			method: 'POST',
			body: JSON.stringify(promptInput),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return postPrompt;
	} catch (e: any) {
		console.error('postPrompt Error', e);
	}
};

type category = {
	category: {
		name: string;
	};
};

const insertPromptCategory = async ({ category }: category) => {
	try {
		const response = await fetch('/api/categories', {
			method: 'POST',
			body: JSON.stringify(category),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (e: any) {
		console.error('insertPromptCategory Error', e);
	}
};
const deletePrompt = async (id: string) => {
	try {
		const response = await fetch('/api/prompt/', {
			method: 'DELETE',
			body: JSON.stringify({
				id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (e: any) {
		console.error('deletePrompt Error', e);
	}
};

const getPromptById = async (id: string) => {
	try {
		const response = await fetch(`/api/prompt/${id}`, {
			method: 'GET',
		});

		if (response.ok) {
			const data = await response.json();
			// convert data to selectedChat
			if (data) {
				const selectedChat: selectedChat = {
					selectedId: data?.id,
					chatMessages: data,
				};
				return selectedChat;
			}
		}
	} catch (error: any) {
		console.error('getPromptById Error', error);
	}
};

const getPublicPromptById = async (id: string) => {
	unstable_noStore();
	try {
		const { data, error } = await supabase
			.from('prompt')
			.select(
				`id, title, input, instructions, created_at, published, categories (id, name, created_at)`
			)
			.eq('id', id)
			.is('published', true)
			.single();

		return { data, error };
	} catch (error: any) {
		console.error('getPublicPromptById Error', error);
	}
};

const switchPublishPrompt = async ({
	id,
	published,
}: {
	id: string;
	published: boolean;
}) => {
	const { data, error } = await supabase
		.from('prompt')
		.update({ published })
		.eq('id', id)
		.select();
	let selectedChat: selectedChat | null = null;
	if (data) {
		selectedChat = {
			selectedId: data?.[0].id,
			chatMessages: data?.[0] as PromptProps, // Add the missing 'as PromptProps' cast here
		};
	}

	return { selectedChat, error };
};

export const promptService = {
	getPublicPromptById,
	getPromptById,
	deletePrompt,
	getPromptCategories,
	getAllPrompts,
	postPrompt,
	insertPromptCategory,
	switchPublishPrompt,
};
