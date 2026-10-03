import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {/* Global Chatbot rendered on every page */}
      <Chatbot />
    </div>
  );
};

export default Layout;
