'ues client';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import {
	signUpSchema,
	SignUpValidationSchemaType,
} from '@/lib/types/auth/auth-lib';

const supabase = createClient();

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

export const SignUpUser = async (values: z.infer<typeof signUpSchema>) => {
	const {
		data: { user, session },
		error,
	} = await supabase.auth.signUp(values);

	return { user, error };
};
