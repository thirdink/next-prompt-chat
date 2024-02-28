import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promptService } from '@/service/server/prompt-service';
import { promptSchema } from '@/lib/types/prompt/prompt-lib';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const response = promptSchema.promptFormSchema.safeParse(
			await req.json()
		);
		if (!response.success) {
			const { errors } = response.error;
			return NextResponse.json({ error: errors }, { status: 400 });
		}
		let { input, instructions, categories, title } = response.data;
		if (categories === '') {
			categories = null;
		}

		const { data, error } = await promptService.insertPrompt({
			input,
			instructions,
			title,
			categories_id: categories,
		});

		if (error) {
			console.error(error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(data, { status: 200 });
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}

export async function GET() {
	try {
		const { data, error } = await promptService.fetchPrompts();

		if (error) {
			console.error(error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json(data, { status: 200 });
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
	const { id } = await req.json();

	const { data, error } = await promptService.deletePromptById(id as string);

	if (error) {
		console.error(error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data, { status: 200 });
}
