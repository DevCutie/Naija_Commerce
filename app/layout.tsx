import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">

        <nav className="p-4 bg-slate-900 text-white font-bold">
          NAIJA NAV BAR
        </nav>

        <main className="flex-1">
          {children}
        </main>
        
      </body>
    </html>
  );
}