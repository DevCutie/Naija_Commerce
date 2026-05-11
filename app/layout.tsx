import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from '@/components/theme-provider'; 

export const metadata: Metadata = {
  title: 'Naija Commerce',
  description: 'A high-performance e-commerce platform for the Nigerian market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className="h-full antialiased" suppressHydrationWarning>

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
     );
}