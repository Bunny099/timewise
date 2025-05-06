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
  title: "TimeWise",
  description:
    "TimeWise is a smart time-tracking tool designed to help developers and teams log time, manage tasks, and generate insightful reports with ease.",
  keywords: [
    "TimeWise",
    "Time Tracking",
    "Work Timer",
    "Project Time Management",
    "Developer Productivity",
    "Time Reports",
    "Freelancer Tools",
    "Task Management",
    "Next.js App",
  ],
  authors: [
    { name: "TimeWise ", url: "https://timewise-beta.vercel.app" },
    { name: "Jayesh Khuman" }, 
  ],
  creator: "TimeWise",
  publisher: "TimeWise",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "TimeWise - Smart Time Tracking for Modern Teams",
    description:
      "Track your time, manage projects, and generate clean reports with TimeWise. Designed for developers, freelancers, and small teams.",
    url: "https://timewise-beta.vercel.app",
    siteName: "TimeWise",
    images: [
      {
        url: "https://timewise-beta.vercel.app/home.png",
        width: 1200,
        height: 630,
        alt: "TimeWise App Screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeWise – Effortless Time Tracking",
    description:
      "TimeWise is a web app that helps you log, monitor, and report time spent on tasks and projects — built for productivity.",
    images: ["https://timewise-beta.vercel.app/report.png"],
    
  },
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
    </html>
  );
}
