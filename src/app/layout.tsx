import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import VerificationBanner from "./components/VerificationBanner";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          {/* Global Navigation */}
          <Navbar />
          {/* Verification Banner for unverified users */}
          <VerificationBanner />
          <main className="flex-1">
            {children}
          </main>
          {/* Footer with Privacy Policy link */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
