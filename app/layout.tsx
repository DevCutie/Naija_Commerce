import type { Metadata } from 'next';
import Link from 'next/link';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';
import { CartMerger } from '@/components/CartMerger';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import  HydrationGate  from "@/components/HydrationGate";



export const metadata: Metadata = {
	title: 'Naija Commerce',
	description:
		'A high-performance e-commerce platform for the Nigerian market.',
};



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {



	return (
		<html lang="en" className="h-full antialiased" suppressHydrationWarning>
			<body className="min-h-full flex flex-col" suppressHydrationWarning>
				<HydrationGate />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<header className="w-full border-b p-4 flex justify-between items-center flex-wrap gap-4">
						<Link href="/" className="font-bold text-xl tracking-tight">
							Naija Commerce
						</Link>

						<div className="flex items-center gap-4 ml-auto">
							<nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
								<Link
									href="/"
									className="hover:text-foreground transition-colors"
								>
									Home
								</Link>
								<Link
									href="/account"
									className="hover:text-foreground transition-colors"
								>
									Account
								</Link>
								<Link
									href="/contact"
									className="hover:text-foreground transition-colors"
								>
									Contact
								</Link>
								<Link
									href="/login"
									className="hover:text-foreground transition-colors"
								>
									Sign In / Up
								</Link>
							</nav>

							<div className="pl-4 border-l border-slate-200 dark:border-slate-800">
								<CartDrawer />
							</div>
						</div>
					</header>

					<main className="flex-grow">
						<QueryProvider>{children}</QueryProvider>
					</main>

					<Toaster />
					<CartMerger />
				</ThemeProvider>
			</body>
		</html>
	);
}
