import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import {
	Message as VercelChatMessage,
	StreamingTextResponse,
	experimental_StreamData,
	OpenAIStream,
} from 'ai';
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
		const { temperature, messages, instructions, topP, modelName } =
			await req.json();

		const Messages = messages ?? [];
		const formatedPreviousMessages = Messages.slice(0, -1).map(
			formatMessage
		);
		const currentMessageContent = messages[messages.length - 1].content;
		const prompt = PromptTemplate.fromTemplate(TEMPLATE(instructions));

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
		console.log('model: ', model);

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

		// const { messages } = await req.json();

		// // Clean up the messages to only include role and content
		// const allowedMessages = messages.map((message: any) => ({
		// 	role: message.role,
		// 	content: message.content,
		// }));

		// const response = await openai.chat.completions.create({
		// 	model: 'gpt-3.5-turbo',
		// 	stream: true,
		// 	messages: allowedMessages,
		// 	temperature: 0.8,
		// 	top_p: 1.0,
		// 	n: 1,
		// 	presence_penalty: 0.0,
		// 	frequency_penalty: 0.0,
		// 	logit_bias: {},
		// });

		// // Instantiate the data
		// const data = new experimental_StreamData();

		// // Convert the response into a friendly text-stream
		// const stream = OpenAIStream(response, {
		// 	experimental_streamData: true, // Enables streaming data
		// });

		// // Append only the last message
		// const lastMessage = messages[messages.length - 1];
		// data.append(lastMessage);

		// data.close();

		// // Respond with the stream
		// return new StreamingTextResponse(stream, {}, data);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
