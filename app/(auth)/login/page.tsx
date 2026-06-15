'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function AuthPage() {
	const [isSignUp, setIsSignUp] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (isSignUp) {
				const { error } = await authClient.signUp.email({
					email,
					password,
					name: name || 'New User',
				});

				if (error) {
					alert(`Error: ${error.message || 'Failed to sign up'}`);
				} else {
					alert('Account created successfully! You can now log in.');
					setIsSignUp(false);
				}
			} else {
				const { error } = await authClient.signIn.email({
					email,
					password,
				});

				if (error) {
					alert(`Error: ${error.message || 'Invalid credentials'}`);
				} else {
					router.push('/checkout');
					router.refresh();
				}
			}
		} catch (_err) {
			alert('Network Error: Could not connect to the authentication server.');
		}
	};

	return (
		<div className="container mx-auto py-20 px-4 flex justify-center">
			<div className="w-full max-w-md border border-slate-800 rounded-lg p-8 bg-black">
				<h1 className="text-3xl font-bold text-white mb-8">
					{isSignUp ? 'Create Account' : 'Welcome Back'}
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{isSignUp && (
						<input
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-slate-600 outline-none"
							required={isSignUp}
						/>
					)}

					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-slate-600 outline-none"
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-slate-600 outline-none"
						required
					/>

					<button
						type="submit"
						className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-slate-200 transition-colors mt-2"
					>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</button>
				</form>

				<p className="text-slate-400 text-sm mt-6 text-center">
					{isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
					<button
						type="button"
						onClick={() => setIsSignUp(!isSignUp)}
						className="text-white hover:underline font-semibold ml-1"
					>
						{isSignUp ? 'Sign In' : 'Sign Up'}
					</button>
				</p>
			</div>
		</div>
	);
}
