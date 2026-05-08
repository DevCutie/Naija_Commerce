import type { Metadata } from 'next';
import './globals.css';
// 1. THIS IMPORT MUST BE HERE
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
    // 2. THIS suppressHydrationWarning MUST BE HERE
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        
        {/* 3. THIS WRAPPER MUST BE HERE */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}