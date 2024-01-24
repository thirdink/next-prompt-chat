import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { promptService } from '@/service/server/prompt-service';
export async function POST(req: NextRequest) {
	try {
		let { input, instructions, categories, title } = await req.json();
		if(categories===''){
			categories=null;
		}

		const { data, error } = await promptService.insertPrompt({
			input,
			instructions,
			title,
			categories_id: categories,
		});

		if (error) {
			console.error(error.message);
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
		}

		return NextResponse.json(data, { status: 200 });
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
