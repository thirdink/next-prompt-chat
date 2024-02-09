import { NextRequest, NextResponse } from 'next/server';
import { categoriesSchema } from '@/lib/types/categories/categories-lib';
import { categoriesService } from '@/service/server/categories-service';
export async function POST(req: NextRequest) {
	try {
		const response = categoriesSchema.categoriesInsertSchema.safeParse(
			await req.json()
		);
		if (!response.success) {
			const { errors } = response.error;
			return NextResponse.json({ error: errors }, { status: 400 });
		}
		const { name } = response.data;
		const { data, error } = await categoriesService.insertCategory({
			name,
		});
		if (error) {
			console.error(error);
		}
		return NextResponse.json(response.data, { status: 200 });
	} catch (e: any) {
		console.error(e.message);
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
