import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Header} from "@/widgets/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <div className="h-dvh px-8">
            <Header/>
            <div style={{height: "calc(100% - 68px)"}} className="py-4">
                {children}
            </div>
        </div>
      </body>
    </html>
  );
}
