import { NextRequest, NextResponse } from 'next/server';
import { chatService } from '@/service/server/chat-service';

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const res = NextResponse.json({
			message: 'Chat history api is being built here',
		});

		return res;
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
	const { id } = await req.json();
	const { data, error } = await chatService.deleteChatById(id as string);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(data, { status: 200 });
}
