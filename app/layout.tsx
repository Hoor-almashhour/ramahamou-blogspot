import type { Metadata } from "next";
import { Cairo } from 'next/font/google'
import "./globals.css";
import Navbar from "./src/Components/Navbar/Navbar";

const cairo = Cairo({ 
  subsets: ['arabic'],
  weight: ["400", "700"],
 })

export const metadata: Metadata = {
  title: "Rama Hamou Blogspot",
  description: "I’m Rama Hammo — a dreamer, storyteller, and biomedical engineering student sharing thoughts from my quiet corner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={cairo .className}
      >
          <Navbar />
          {children}
          
      </body>
    </html>
  );
}
