import { createClient } from '@/lib/supabase/server';
import { data } from 'autoprefixer';
import { cookies } from 'next/headers';

export default async function Notes() {
	const cookieStore = cookies();
	const supabase = createClient();
	const { data: notes } = await supabase.from('notes').select();

	return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
