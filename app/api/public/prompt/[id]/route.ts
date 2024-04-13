import { NextRequest, NextResponse } from 'next/server';
import { promptService } from '@/service/server/prompt-service';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const { data, error } = await promptService.fetchPublicPromptById(id);

	if (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 400 });
	}

	return NextResponse.json(data, { status: 200 });
}
