import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import WeddingOverviewSection from "./components/WeddingOverviewSection";
import TennisTournamentSection from "./components/TennisTournamentSection";
import WeddingDaySection from "./components/WeddingDaySection";
import BeachPartySection from "./components/BeachPartySection";
import { Metadata } from "next/types";
import SparkleButton from "./components/SparkleButton";

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            {/* <UnsplashImageHolder /> */}
            <Image
              src="/assets/images/IMG_1143.jpg"
              alt="Wedding background"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white max-w-2xl px-4">
            {/* Responsive heading - smaller on mobile, larger on desktop */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl bungee-regular mb-4 leading-tight tracking-wide">
              JOHANNA &amp; SEBASTIAN&apos;S WEDDING&nbsp;WEEKEND
            </h2>

            {/* Changed from Sigmar to Bungee */}
            <p className="text-lg sm:text-xl mb-4 sm:mb-6 bungee-regular tracking-wide">
              June 19-21, 2025 |&nbsp;📍&nbsp;Båstad,&nbsp;Sweden
            </p>

            {/* Changed to Quicksand for better readability */}
            <p className="text-base sm:text-lg mb-6 sm:mb-8 quicksand-regular max-w-prose mx-auto font-medium">
              A weekend filled with love, laughter, and&nbsp;celebration—come&nbsp;join&nbsp;us!
            </p>

            {/* Replace the existing RSVP Link with SparkleButton */}
            <SparkleButton />
          </div>
        </section>

        {/* Wedding Weekend Overview Section */}
        <WeddingOverviewSection />
        <TennisTournamentSection />
        <WeddingDaySection />
        <BeachPartySection />
      </main>
    </div>
  );
}