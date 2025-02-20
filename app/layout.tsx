import type { Metadata } from "next";
import { Bungee, Sigmar, Quicksand } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';

// Configure Bungee
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
  display: 'swap',
});

// Configure Sigmar
const sigmar = Sigmar({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sigmar',
  display: 'swap',
});

// Configure Quicksand for better paragraph readability
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Johanna & Sebastian's Wedding",
  description: "Join us for our wedding celebration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bungee.variable} ${sigmar.variable} ${quicksand.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
