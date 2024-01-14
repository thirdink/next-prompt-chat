import { PromptProps } from '@/lib/types/prompt/prompt-lib';

type State = PromptProps[];
type Action = { type: 'SET_PROMPTS'; payload: PromptProps[] };

export function createInitialState(): State {
	return [];
}
export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_PROMPTS':
			return action.payload;
		default:
			throw new Error('Unknown action: ' + action.type);
	}
}
