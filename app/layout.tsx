import type { Metadata } from "next/types";
import { Bungee, Quicksand } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';

// Configure Bungee
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
  display: 'swap',
});

// Configure Quicksand for better paragraph readability
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Johanna & Sebastian's Wedding Weekend",
  description: "Join us for a weekend of celebration in Båstad, Sweden from June 19-21, 2025. Tennis tournament, wedding ceremony, and beach party!",
  openGraph: {
    title: "Johanna & Sebastian's Wedding Weekend",
    description: "Join us for a weekend of celebration in Båstad, Sweden from June 19-21, 2025",
    images: [
      {
        url: "https://raw.githubusercontent.com/Harry-Yates/sandstrand-wedding/refs/heads/main/public/assets/images/MetaOne.webp",
        width: 1200,
        height: 630,
        alt: "Johanna and Sebastian's Wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Johanna & Sebastian's Wedding Weekend",
    description: "Join us for a weekend of celebration in Båstad, Sweden from June 19-21, 2025",
    images: ["https://raw.githubusercontent.com/Harry-Yates/sandstrand-wedding/refs/heads/main/public/assets/images/MetaOne.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bungee.variable} ${quicksand.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
