import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  );
}
