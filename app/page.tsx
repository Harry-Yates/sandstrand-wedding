'use client';

import Image from "next/image";
import Navbar from "./components/Navbar";
import WeddingOverviewSection from "./components/WeddingOverviewSection";
import TennisTournamentSection from "./components/TennisTournamentSection";
import WeddingDaySection from "./components/WeddingDaySection";
import BeachPartySection from "./components/BeachPartySection";

import SparkleButton from "./components/SparkleButton";
import Footer from "./components/Footer";
import WeddingOverviewSectionSv from "./components/WeddingOverviewSectionSv";
import { useState, useEffect } from "react";

export default function Home() {
  'use client';

  const [isSwedish, setIsSwedish] = useState(false);

  useEffect(() => {
    // Check if browser language starts with 'sv' (Swedish)
    const browserLang = navigator.language.toLowerCase();
    setIsSwedish(browserLang.startsWith('sv'));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <button
        onClick={() => setIsSwedish(!isSwedish)}
        className="fixed top-20 right-4 bg-[#98fb6a] text-black px-4 py-2 rounded-md z-[100]"
      >
        Switch to {isSwedish ? 'English' : 'Swedish'}
      </button> */}
      <main>
        {/* Hero Section */}
        <section className="relative h-[700px] sm:h-[800px] md:h-[900px] flex items-start justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/IMG_1027.jpg"
              alt="Wedding background"
              fill
              priority
              className="object-cover object-[center_32%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
          </div>
          <div className="relative z-10 text-center text-[#f3ff56] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-6 sm:px-8 mx-auto pt-32">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bungee mb-8 md:mb-10 leading-tight">
              JOHANNA & SEBASTIAN&apos;S WEDDING WEEKEND
            </h2>
            <p className="text-xl sm:text-2xl text-center mb-8 font-light">
              Join us for our celebration
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-center font-medium mb-8">
              June 19-21, 2025
            </p>
            <p className="text-xl sm:text-2xl text-center mb-16">
              📍 Båstad, Sweden
            </p>
            <div className="mt-4">
              <SparkleButton />
            </div>
          </div>
        </section>

        {/* Main content sections - removed nested main element */}
        <div>
          {isSwedish ? <WeddingOverviewSectionSv /> : <WeddingOverviewSection />}
          <TennisTournamentSection />
          <WeddingDaySection />
          <BeachPartySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}