import React, { useEffect, useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { promptSchema } from '@/lib/types/prompt/prompt-lib';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';
import { promptService } from '@/service/client/prompt-service';
import { toast } from '@/components/ui/use-toast';

const promptFormSchema = promptSchema.promptFormSchema;

const categoriesSchemaArray = promptSchema.categoriesSchemaArray;

const CreateNewPrompt = ({ getPrompts }: { getPrompts: () => void }) => {
	const { handleSubmit } = useForm();
	const [isAddCategories, setIsAddCategoriesInput] = useState(false);
	const [addNewCategory, setAddNewCategory] = useState<string>('');
	const [categories, setCategories] = useState<
		z.infer<typeof categoriesSchemaArray>
	>([]);
	const form = useForm<z.infer<typeof promptFormSchema>>({
		resolver: zodResolver(promptFormSchema),
		defaultValues: {
			title: '',
			input: '',
			instructions: '',
			categories: '',
		},
	});
	const handlePromptSubmit = async (
		data: z.infer<typeof promptFormSchema>
	) => {
		// post request to 'api/prompt'
		try {
			await promptService.postPrompt(data);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong with creating the prompt.',
				description: (error as Error).message,
			});
		}
	};
	// 2. Define a submit handler.
	function onSubmit(
		data: z.infer<typeof promptFormSchema>,
		e: React.FormEvent<HTMLFormElement>
	) {
		// create an api call to create a prompt at api/prompt
		e.preventDefault();
		handlePromptSubmit(data);
	}
	const getCategories = async () => {
		const getPromptCategories = await promptService.getPromptCategories();
		setCategories(getPromptCategories.promptCategories);
	};
	const handleNewCategoryChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAddNewCategory(e.target.value);
	};

	useEffect(() => {
		getCategories();
	}, []);
	useEffect(() => {
		form.reset();
		getPrompts();
	}, [form.formState.isSubmitSuccessful]);
	return (
		<div className='flex items-center space-x-2 justify-end p-10'>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='secondary'>Create</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[625px]'>
					<DialogHeader>
						<DialogTitle>Create Prompt</DialogTitle>
						<DialogDescription>
							you can paste your prompt here
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4'>
						<Form {...form}>
							<div className='space-y-8'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter the title for the prompt here.'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='categories'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Categories</FormLabel>
											<div className='grid max-w-md grid-cols-2 gap-8 pt-2'>
												<FormItem>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger className='w-[180px]'>
																<SelectValue placeholder='select a category' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{categories.map(
																(category) => (
																	<SelectItem
																		key={
																			category.id
																		}
																		value={
																			category.id
																		}
																	>
																		{
																			category.name
																		}
																	</SelectItem>
																)
															)}
														</SelectContent>
													</Select>
												</FormItem>
												<FormItem>
													{isAddCategories ===
													false ? (
														<>
															<Button
																size='sm'
																variant='outline'
																onClick={() => {
																	setIsAddCategoriesInput(
																		true
																	);
																}}
															>
																Add Category
															</Button>
														</>
													) : null}
													{isAddCategories ? (
														<div className='grid w-[335px] grid-cols-2 gap-2'>
															<FormControl>
																<Input
																	placeholder='Enter category here.'
																	onChange={
																		handleNewCategoryChange
																	}
																/>
															</FormControl>
															{addNewCategory.length >
															0 ? (
																<Button
																	size='sm'
																	variant='outline'
																	onClick={() => {
																		console.log(
																			addNewCategory
																		);
																	}}
																>
																	Add
																</Button>
															) : (
																<Button
																	size='sm'
																	variant='outline'
																	onClick={(
																		event
																	) => {
																		event.preventDefault();
																		setIsAddCategoriesInput(
																			false
																		);
																	}}
																>
																	Cancel
																</Button>
															)}
															<FormDescription>
																Provide new
																Category here.
															</FormDescription>
														</div>
													) : null}
												</FormItem>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='input'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Prompt Input</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Create a paragraph on samurai in Japan in the 1800s.'
													className='flex-1 lg:min-h-[381px]'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Provide the prompt input here.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='instructions'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Instructions</FormLabel>
											<FormControl>
												<Input
													placeholder='Enter instructions for the prompt here.'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Provide additional instructions
												or guidelines for the prompt.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogClose asChild>
									<Button
										type='submit'
										onClick={handleSubmit(
											onSubmit as SubmitHandler<FieldValues>
										)}
									>
										Save
									</Button>
								</DialogClose>
							</div>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateNewPrompt;
