'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			variant="outline"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="flex items-center gap-2"
		>
			<Sun className="h-4 w-4 dark:hidden" />
			<Moon className="h-4 w-4 hidden dark:block" />
			<span>Toggle Theme</span>
		</Button>
	);
}
