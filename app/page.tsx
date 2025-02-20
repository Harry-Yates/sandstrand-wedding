import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import WeddingOverviewSection from "./components/WeddingOverviewSection";

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
              💍 JOHANNA &amp; SEBASTIAN&apos;S WEDDING&nbsp;WEEKEND 💃✨
            </h2>

            {/* Changed from Sigmar to Bungee */}
            <p className="text-lg sm:text-xl mb-4 sm:mb-6 bungee-regular tracking-wide">
              June 19-21, 2025 |&nbsp;📍&nbsp;Båstad,&nbsp;Sweden
            </p>

            {/* Changed to Quicksand for better readability */}
            <p className="text-base sm:text-lg mb-6 sm:mb-8 quicksand-regular max-w-prose mx-auto font-medium">
              A weekend filled with love, laughter, and&nbsp;celebration—come&nbsp;join&nbsp;us!
            </p>

            {/* RSVP button with responsive padding and text size */}
            <Link
              href="/rsvp"
              className="inline-block bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full bungee-regular hover:bg-gray-100 transition-colors text-base sm:text-lg"
            >
              RSVP Now
            </Link>
          </div>
        </section>

        {/* Wedding Weekend Overview Section */}
        <WeddingOverviewSection />
      </main>
    </div>
  );
}