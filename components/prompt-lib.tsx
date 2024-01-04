'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LibContainer } from '@/lib/utils';
import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
});

const PromptLib = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	const handleCreatePrompt = () => {};
	return (
		<>
			<div className='flex items-center space-x-2 justify-end p-10'>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='secondary'>Create</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[625px]'>
						<DialogHeader>
							<DialogTitle>Create Prompt</DialogTitle>
							<DialogDescription>
								You can use the following code to start
								integrating your current prompt and settings
								into your application.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4'>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-8'
								>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Username</FormLabel>
												<FormControl>
													<Input
														placeholder='shadcn'
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is your public display
													name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type='submit'>Submit</Button>
								</form>
							</Form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 1</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 2</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 3</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 4</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 5</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 6</div>
					</LibContainer>
				</div>
			</div>
		</>
	);
};

export default PromptLib;
