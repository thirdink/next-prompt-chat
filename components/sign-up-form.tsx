'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	signUpSchema,
	SignUpValidationSchemaType,
} from '@/lib/types/auth/auth-lib';
import { SignUpUser } from '@/service/client/auth-service';
import { toast } from '@/components/ui/use-toast';

const SignUpForm = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const signUpForm = useForm<SignUpValidationSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSignUpSubmit(value: z.infer<typeof signUpSchema>) {
		setIsLoading(true);
		const result = await SignUpUser(value);
		if (result.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with deleting the prompt.',
				description: JSON.stringify(result?.error),
			});
		}
		if (result.user) {
			toast({
				title: 'Sign Up Successful',
				description: 'You have been signed up',
			});
		}
		setIsLoading(false);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'absolute right-4 top-4 md:right-8 md:top-8'
					)}
					variant='ghost'
				>
					{' '}
					Sign Up
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Sign Up</DialogTitle>
					<DialogDescription>
						Sign up to prompt lib below
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<Form {...signUpForm}>
						<form
							onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
						>
							<div className='grid gap-2'>
								<div className='grid gap-1'>
									<FormField
										control={signUpForm.control}
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
										control={signUpForm.control}
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
									<FormField
										control={signUpForm.control}
										name='confirmPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel
													className='sr-only'
													htmlFor='confirmPassword'
												>
													Confirm Password
												</FormLabel>
												<FormControl>
													<Input
														id='confirmPassword'
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
									<Button type='submit' disabled={isLoading}>
										{isLoading && (
											<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
										)}
										Sign Up
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>

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
					{/* {isLoading ? (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						) : ( */}
					<Icons.gitHub className='mr-2 h-4 w-4' />
					{/* )} */} GitHub
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default SignUpForm;
