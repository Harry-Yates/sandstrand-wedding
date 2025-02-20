import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

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
            <h2 className="text-4xl font-bold mb-4">
              💍 JOHANNA &amp; SEBASTIAN&apos;S WEDDING WEEKEND 💃✨
            </h2>
            <p className="text-xl mb-6">
              June 19-21, 2025 | 📍 Båstad, Sweden
            </p>
            <p className="text-lg mb-8">
              A weekend filled with love, laughter, and celebration—come join us!
            </p>
            <Link
              href="/rsvp"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              RSVP Now
            </Link>
          </div>
        </section>

        {/* Wedding Weekend Overview Section */}
        <section className="bg-pink-100 relative text-gray-900">
          <div className="flex flex-col md:flex-row">
            {/* Image Column - Full height, aligned to left edge */}
            <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0">
              <div className="h-[300px] md:h-full w-full relative">
                {/* <UnsplashImageHolder /> */}
                <Image
                  src="/assets/images/IMG_1027.jpg"
                  alt="Wedding background"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

              </div>
            </div>

            {/* Content Column - Now starts directly with the list */}
            <div className="md:w-1/2 md:ml-[50%] py-16 px-4 md:px-16">
              <ul className="space-y-6">
                <li className="bg-white/50 p-6 rounded-xl">
                  <strong className="text-xl block mb-2">🎾 June 19 – Tennis Tournament</strong>
                  Plantahagens Tennis Courts | ⏰ 17:00-21:00
                  <br />
                  Dress Code: Wimbledon Chic (white, green, or pink)
                  <br />
                  Featuring smörgåstårta & rosé wine 🍷✨
                </li>
                <li className="bg-white/50 p-6 rounded-xl">
                  <strong className="text-xl block mb-2">💒 June 20 – Wedding & Party</strong>
                  Hovs Kyrka | ⏰ 14:30 Ceremony
                  <br />
                  Buses leave 13:40 (Only from Riviera Strand & Skansen)
                  <br />
                  Mingle 16:00-17:30 at GW Swensons Lada
                  <br />
                  Dinner party until 02:00
                  <br />
                  Dress Code: Colourful dress & suite (NO dark blue!)
                </li>
                <li className="bg-white/50 p-6 rounded-xl">
                  <strong className="text-xl block mb-2">🏖️ June 21 – Beach Party</strong>
                  Badkrukan | 🍕 Pizza & Drinks ⏰ 13:00 Party starts
                  <br />
                  Swim, dance, and celebrate!
                  <br />
                  Dress Code: Beach Chic
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}