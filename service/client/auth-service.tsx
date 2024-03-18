'ues client';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
// import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { UserResponse } from '@supabase/supabase-js';
import { signUpSchema, loginSchema } from '@/lib/types/auth/auth-lib';

const supabase = createClient();
// const githubClient = createSupabaseClient(
// 	process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

function protectedComponent<T>(WrappedComponent: React.ComponentType<T>) {
	return function ProtectedRoute(props: T) {
		const router = useRouter();
		const [user, setUser] = useState<UserResponse | null>(null);

		useEffect(() => {
			supabase.auth.getUser().then((user) => {
				if (!user.data.user) {
					router.push('/');
				} else {
					setUser(user);
				}
			});
		}, []);

		if (!user) {
			return null;
		}

		return <WrappedComponent {...(props as React.PropsWithChildren<T>)} />;
	};
}

export { protectedComponent };

const SignUpUser = async (values: z.infer<typeof signUpSchema>) => {
	const {
		data: { user, session },
		error,
	} = await supabase.auth.signUp(values);

	return { user, error };
};

const loginUser = async (values: z.infer<typeof loginSchema>) => {
	const { data, error } = await supabase.auth.signInWithPassword(values);
	return { data, error };
};

async function signInWithGithub() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${location.origin}/auth/callback`,
		},
	});
	return { data, error };
}

export const AuthService = {
	SignUpUser,
	loginUser,
	signInWithGithub,
};
