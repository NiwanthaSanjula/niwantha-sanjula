import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Share_Tech_Mono, Rajdhani, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import BackgroundHUD from "@/components/shared/BackgroundHUD";
import Footer from "@/components/shared/Footer";
import SmoothScrolling from "@/components/ui/SmoothScrolling";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Niwantha Sanjula | Software Engineer",
  description: "Portfolio of Niwantha Sanjula",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} ${shareTechMono.variable} ${rajdhani.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent overflow-x-hidden">

        <SmoothScrolling>
          <BackgroundHUD />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrolling>

      </body>
    </html>
  );
}