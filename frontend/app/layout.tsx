import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management App",
  description: "A modern task management application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 my-4">
          <p>Built with Next.js, Express, and MongoDB</p>
        </footer>
      </body>
    </html>
  );
}
