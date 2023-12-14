import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
        const res = NextResponse.json({ message: 'Hello, world!' });
        
		return res;
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
