import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthContextProvider from "@/context/authContext";
import JobContextProvider from "@/context/jobContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Needy",
  description: "Find jobs in own domain",
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
        <AuthContextProvider>
          <JobContextProvider>
            {children}
          </JobContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}