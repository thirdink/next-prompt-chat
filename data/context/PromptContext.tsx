'use client';
import React, { createContext, useReducer, Dispatch } from 'react';
import { PromptProps } from '@/lib/types/prompt/prompt-lib';

type State = {
	prompt: PromptProps[];
	selectedPrompt: PromptProps | null;
};
type Action = {
	type:
		| 'SET_PROMPTS'
		| 'ADD_PROMPT'
		| 'REMOVE_PROMPT'
		| 'UPDATE_PROMPT'
		| 'SELECTED_PROMPT';
	payload: PromptProps | PromptProps[];
};

const initialState: State = {
	prompt: [],
	selectedPrompt: null,
};

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_PROMPTS':
			return { ...state, prompt: action.payload as PromptProps[] };
		case 'ADD_PROMPT':
			return {
				...state,
				prompt: [...state.prompt, action.payload as PromptProps],
			};
		default:
			throw new Error('Unknown action: ' + action.type);
	}
}

export const PromptContext: React.Context<[State, Dispatch<Action>]> =
	createContext<[State, Dispatch<Action>]>([initialState, () => {}]);

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
