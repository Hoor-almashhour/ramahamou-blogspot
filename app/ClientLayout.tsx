'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Navbar from './src/Components/Navbar/Navbar';
import Footer from './src/Components/Footer/Footer';

interface Props {
  children: ReactNode;
}

export default function ClientLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>
    

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      <Footer/>
    </div>
  );
}
