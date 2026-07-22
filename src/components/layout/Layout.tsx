import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-paper overflow-x-hidden max-w-[100vw]">
      <Header />
      <main className="flex-1 w-full max-w-newspaper mx-auto overflow-x-hidden max-w-[100vw]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
