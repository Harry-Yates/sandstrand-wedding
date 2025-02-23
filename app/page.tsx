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
        <section className="relative h-[99vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/IMG_1027.jpg"
              alt="Wedding background"
              fill
              priority
              className="object-cover object-[center_25%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          </div>
          <div className="relative z-10 text-center text-[#f3ff56] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-6 sm:px-8 mx-auto mt-[45vh]">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bungee mb-6 md:mb-12 leading-tight md:leading-none">
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