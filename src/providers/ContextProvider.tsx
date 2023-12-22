'use client';

import { GlobalProvider } from '@/context';
import { Toaster } from 'react-hot-toast';

export function ContextProvider({ children }: LayoutProps) {
  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}
