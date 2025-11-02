import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./src/Components/Navbar/Navbar";
import { Noto_Sans_Arabic } from "next/font/google";

const noto = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
});


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
       <body className={noto.className}
      >
          <Navbar />
          {children}
          
      </body>
    </html>
  );
}
