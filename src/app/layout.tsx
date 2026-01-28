import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/AuthContext";
import VerificationBanner from "./components/VerificationBanner";
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
      <body className="antialiased">
        <AuthProvider>
          {/* Global Navigation */}
          <Navbar />
          {/* Verification Banner for unverified users */}
          <VerificationBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
