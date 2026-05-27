import type { Metadata } from 'next';
import CartDrawer from "@/components/CartDrawer";
import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import { CartMerger } from "@/components/CartMerger";
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

          <header className="w-full border-b p-4 flex justify-between items-center">
            <div className="font-bold text-xl tracking-tight">Naija Commerce</div>
           <CartDrawer/>
          </header>


          <main className="flex-grow">
            {children}
          </main>
          
          <Toaster />
          <CartMerger />
        </ThemeProvider>
      </body>
    </html>
  );}