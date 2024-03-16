'use client';

import * as React from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '@/service/client/auth-service';
import { useRouter } from 'next/navigation';
import {
	loginSchema,
	LoginValidationSchemaType,
} from '@/lib/types/auth/auth-lib';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const signLoginForm = useForm<LoginValidationSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	async function onLogInSubmit(value: z.infer<typeof loginSchema>) {
		setIsLoading(true);
		const result = await loginUser(value);
		console.log('result', result);
		if (result.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with deleting the prompt.',
				description: JSON.stringify(result?.error),
			});
		}
		if (result.data?.user) {
			toast({
				title: 'Sign In Successful',
			});
		}
		setIsLoading(false);

		router.push('/dashboard');
		router.refresh();
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...signLoginForm}>
				<form onSubmit={signLoginForm.handleSubmit(onLogInSubmit)}>
					<div className='grid gap-2'>
						<div className='grid gap-1'>
							<FormField
								control={signLoginForm.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className='sr-only'
											htmlFor='email'
										>
											Email
										</FormLabel>
										<FormControl>
											<Input
												id='email'
												placeholder='name@example.com'
												type='email'
												required
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={signLoginForm.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel
											className='sr-only'
											htmlFor='password'
										>
											Password
										</FormLabel>
										<FormControl>
											<Input
												id='password'
												type='password'
												placeholder='********'
												required
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type='submit' disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							Sign In
						</Button>
					</div>
				</form>
			</Form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>
			<Button variant='outline' type='button' disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
				) : (
					<Icons.gitHub className='mr-2 h-4 w-4' />
				)}{' '}
				GitHub
			</Button>
		</div>
	);
}
