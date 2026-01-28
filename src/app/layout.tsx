import type { Metadata } from "next";
import Link from "next/link";
import Logo from "./components/Logo";
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
      <body className="antialiased" style={{ fontFamily: 'var(--font-primary)', backgroundColor: 'var(--color-luxury-white)', color: 'var(--color-luxury-black)' }}>
        {/* Global Navigation */}
        <nav className="border-b" style={{ borderColor: 'var(--color-luxury-gray-200)', backgroundColor: 'var(--color-luxury-white)' }}>
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-70">
              <Logo size="md" />
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
