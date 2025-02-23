import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Johanna & Sebastian's Wedding Weekend",
  description: "Join us for a weekend of celebration in Båstad, Sweden from June 19-21, 2025. Tennis tournament, wedding ceremony, and beach party!",
  openGraph: {
    title: "Johanna & Sebastian's Wedding Weekend",
    description: "Join us for a weekend of celebration in Båstad, Sweden from June 19-21, 2025",
    images: [
      {
        url: "https://raw.githubusercontent.com/Harry-Yates/sandstrand-wedding/refs/heads/main/public/assets/images/Meta.webp",
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
    images: ["https://raw.githubusercontent.com/Harry-Yates/sandstrand-wedding/refs/heads/main/public/assets/images/Meta.webp"],
  },
}; 