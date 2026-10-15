import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readex = Readex_Pro({ subsets: ["latin", "arabic"], variable: "--font-readex" });

export const metadata: Metadata = {
  title: "Text to Binary",
  description: "Convert text to binary and binary back to text as you type. Full UTF-8 support, including Arabic and emoji.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={readex.variable}>
      <body className="wb">
        {children}
      </body>
    </html>
  );
}
