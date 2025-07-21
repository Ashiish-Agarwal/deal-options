import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "kevin ",
  description: "change ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/16.1.3/smooth-scroll.js" integrity="sha512-vfE8OCUETP038fi2pHsLeJC/5xd48FyLsATJLulbdsCRBXgRWxA+0K9he4GClcPjT24vMJk1mFMFbjYS9J7NpA==" crossOrigin="anonymous"  referrerPolicy="no-referrer"></script> */}
    </html>
  );
}
