import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      {/* Snackbar Portal Container */}
      <div id="snackbar-root" className="fixed bottom-6 right-6 z-[9999] pointer-events-none" />
    </div>
  );
};