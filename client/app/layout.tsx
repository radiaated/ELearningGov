import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMontserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Government Elearning Platform",
  description:
    "The platform enables students to browse and enroll in online video courses, securely authenticate using JWT, stream educational content, and make payments through Khalti's sandbox payment gateway.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMontserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children} <Toaster position="top-right" />
      </body>
    </html>
  );
}
