import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import VerificationBanner from "./components/VerificationBanner";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnLoop",
  description: "Learning-based social app for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        <AuthProvider>
          {/* Global Navigation */}
          <Navbar />
          {/* Verification Banner for unverified users */}
          <VerificationBanner />
          <main id="main-content" className="flex-1 scroll-mt-20">
            {children}
          </main>
          {/* Footer with Privacy Policy link */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
