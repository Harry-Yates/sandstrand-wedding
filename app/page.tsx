import Image from "next/image";
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
        <section className="relative min-h-[70dvh] md:h-[80vh] flex items-center justify-center">
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
          <div className="relative z-10 text-center text-[#98fb6a] max-w-2xl px-4">
            {/* Improved responsive typography */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bungee mb-8 md:mb-16 mt-4 md:mt-8 leading-tight md:leading-none">
              JOHANNA & SEBASTIAN&apos;S WEDDING WEEKEND
            </h2>
            <p className="text-xl sm:text-2xl text-center mb-8 font-light">
              Join us for our celebration
            </p>
            <p className="text-2xl sm:text-3xl text-center font-medium mb-8">
              June 19-21, 2025
            </p>
            <p className="text-xl sm:text-2xl text-center mb-16">
              📍 Båstad, Sweden
            </p>
            <div className="mt-8 md:mt-16">
              <SparkleButton />
            </div>
          </div>
        </section>

        {/* Main content sections - removed nested main element */}
        <div>
          <WeddingOverviewSection />
          <TennisTournamentSection />
          <WeddingDaySection />
          <BeachPartySection />
        </div>
      </main>
    </div>
  );
}