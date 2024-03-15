'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import {
	signUpSchema,
	SignUpValidationSchemaType,
	loginSchema,
	LoginValidationSchemaType,
} from '@/lib/types/auth/auth-lib';

export async function login(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const validatedLogin = loginSchema.safeParse({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	});
	// Return early if the form data is invalid
	if (!validatedLogin.success) {
		return {
			errors: validatedLogin.error.flatten().fieldErrors,
		};
	}

	const { error } = await supabase.auth.signInWithPassword(
		validatedLogin.data
	);

	if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/dashboard');
}

export async function signup(formData: FormData) {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/login');
}
