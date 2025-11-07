import type { Metadata } from "next";
import { Cairo } from 'next/font/google'
import "./globals.css";
import Navbar from "./src/Components/Navbar/Navbar";
import Footer from "./src/Components/Footer/Footer";


const cairo = Cairo({ 
  subsets: ['arabic'],
  weight: ["400", "700"],
  display: "swap", 
  variable: "--font-cairo",
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
    <html lang="ar" className={cairo.variable}>
       <body className={cairo .className}
      >
          <Navbar />
          {children}
          <Footer/>
      </body>
    </html>
  );
}
