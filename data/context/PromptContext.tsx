'use client';
import React, { createContext, useReducer, Dispatch } from 'react';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';
import { selectedChat } from '@/lib/types/chat/chat-lib';

export type Store = {
	prompt: PromptProps[];
	selectedPrompt: selectedChat | null;
};
type Action = {
	type:
		| 'SET_PROMPTS'
		| 'ADD_PROMPT'
		| 'REMOVE_PROMPT'
		| 'UPDATE_PROMPT'
		| 'SELECTED_PROMPT';
	payload: PromptProps | PromptProps[] | selectedChat | null;
};

const initialState: Store = {
	prompt: [],
	selectedPrompt: null,
};

export function reducer(state: Store, action: Action): Store {
	switch (action.type) {
		case 'SET_PROMPTS':
			return { ...state, prompt: action.payload as PromptProps[] };
		case 'ADD_PROMPT':
			return {
				...state,
				prompt: [...state.prompt, action.payload as PromptProps],
			};

		case 'SELECTED_PROMPT':
			return { ...state, selectedPrompt: action.payload as selectedChat };
		default:
			throw new Error('Unknown action: ' + action.type);
	}
}

export const PromptContext: React.Context<[Store, Dispatch<Action>]> =
	createContext<[Store, Dispatch<Action>]>([initialState, () => {}]);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<PromptContext.Provider value={[state, dispatch]}>
			{children}
		</PromptContext.Provider>
	);
};
