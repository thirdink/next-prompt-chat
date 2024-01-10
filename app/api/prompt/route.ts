// pages/api/prompt/create.js
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	try {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		const { input, instructions, categories, title } = await req.json();

		const { data, error } = await supabase
			.from('prompt')
			.insert([{ input, instructions, title, categories_id: categories }])
			.select();

		if (error) {
			console.error(error.message);
		}
		return NextResponse.json(data);
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
