import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

const formatMessage = (message: VercelChatMessage) => {
	return `${message.role}: ${message.content}`;
};
export const runtime = 'edge';

const TEMPLATE = (instructions: string) => {
	return `${instructions}

	Current conversation:
	{chat_history}
	
	User: {input}
	AI:`;
};
/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */

export async function POST(req: NextRequest) {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		const { temperature, messages, instructions, topP, modelName, chatId } =
			await req.json();
		const Messages = messages ?? [];
		const formatedPreviousMessages = Messages.slice(0, -1).map(
			formatMessage
		);
		const currentMessageContent = messages[messages.length - 1].content;
		const currentMessageRole = messages[messages.length - 1].role;
		const prompt = PromptTemplate.fromTemplate(TEMPLATE(instructions));

		const { data, error } = await supabase.rpc('insert_chat_messages', {
			p_chat_id: chatId,
			max_length_tokens: 256,
			message_content: currentMessageContent,
			role: currentMessageRole,
			temp: temperature[0],
			top_p: topP[0],
		});

		/**
		 * You can also try e.g.:
		 *
		 * import { ChatAnthropic } from "langchain/chat_models/anthropic";
		 * const model = new ChatAnthropic({});
		 *
		 * See a full list of supported models at:
		 * https://js.langchain.com/docs/modules/model_io/models/
		 */
		const model = new ChatOpenAI({
			openAIApiKey: process.env.OPENAI_API_KEY,
			temperature,
			topP,
			modelName,
		});

		/**
		 * Chat models stream message chunks rather than bytes, so this
		 * output parser handles serialization and byte-encoding.
		 */
		const outputParser = new BytesOutputParser();

		/**
		 * Can also initialize as:
		 *
		 * import { RunnableSequence } from "langchain/schema/runnable";
		 * const chain = RunnableSequence.from([prompt, model, outputParser]);
		 */
		const chain = prompt.pipe(model).pipe(outputParser);

		const stream = await chain.stream({
			chat_history: formatedPreviousMessages.join('\n'),
			input: currentMessageContent,
		});

		return new StreamingTextResponse(stream);
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
