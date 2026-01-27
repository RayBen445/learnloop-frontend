import type { Metadata } from "next";
import Link from "next/link";
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
      <body className="antialiased">
        {/* Global Navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-blue-700">
              LearnLoop
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
