import z from 'zod';
import { Tables } from '@/database.types';

export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email('Invalid email address'),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords does not match',
	});
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email('Invalid email address'),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});
export type LoginValidationSchemaType = z.infer<typeof loginSchema>;
export type SignUpValidationSchemaType = z.infer<typeof signUpSchema>;
