import Image from "next/image";
import Navbar from "./components/Navbar";
import WeddingOverviewSection from "./components/WeddingOverviewSection";
import TennisTournamentSection from "./components/TennisTournamentSection";
import WeddingDaySection from "./components/WeddingDaySection";
import BeachPartySection from "./components/BeachPartySection";
import { Metadata } from "next/types";
import SparkleButton from "./components/SparkleButton";
import Footer from "./components/Footer";

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
        <section className="relative h-screen flex items-center justify-center bg-gray-100">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/IMG_1143.jpg"
              alt="Wedding background"
              fill
              priority
              className="object-cover transition-opacity duration-300"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // You'll need to generate this
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-[#98fb6a] max-w-2xl px-6 sm:px-8 mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bungee mb-6 md:mb-12 mt-4 md:mt-8 leading-tight md:leading-none">
              JOHANNA & SEBASTIAN&apos;S WEDDING WEEKEND
            </h2>
            <p className="text-xl sm:text-2xl text-center mb-6 font-light">
              Join us for our celebration
            </p>
            <p className="text-2xl sm:text-3xl text-center font-medium mb-6">
              June 19-21, 2025
            </p>
            <p className="text-xl sm:text-2xl text-center mb-12">
              📍 Båstad, Sweden
            </p>
            <div className="mt-8 md:mt-16">
              <SparkleButton />
            </div>
          </div>

          {/* Scroll Indicator - Moved outside the text container */}
          <div className="absolute bottom-8 left-[calc(50%-8px)] transform -translate-x-1/2 animate-bounce z-20">
            <svg
              className="w-8 h-8 text-[#98fb6a]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
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
      <Footer />
    </div>
  );
}