import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components';
import { ContextProvider } from '@/providers/ContextProvider';
import { GlobalStyleProvider } from '@/providers';
import { ClerkProvider, auth } from '@clerk/nextjs';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Created by Abuzar Mamedov, Software Engineer',
};

export default function RootLayout({ children }: LayoutProps) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={inter.className}>
          <NextTopLoader
            height={2}
            color="#27ae60"
            easing="cubic-bezier(0.53, 0.21, 0, 0.1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <Sidebar />}
              {children}
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
