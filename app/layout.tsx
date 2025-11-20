import type { Metadata } from "next";
import { Cairo } from 'next/font/google'
import "./globals.css";

import ClientLayout from "./ClientLayout";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

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
    <html lang="ar" dir="rtl" className={cairo.variable}>
       <body className={cairo .className}
      >
            <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
