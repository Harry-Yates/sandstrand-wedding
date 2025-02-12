import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="space-y-20">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=2590&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Software development concept"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 text-center text-white max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-6">
              Johanna & Sebbe's Wedding
            </h1>
            <p className="text-xl mb-8">
              Join us as we celebrate our love on June 15th, 2024
            </p>
            <Link
              href="/rsvp"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              RSVP Now
            </Link>
          </div>
        </section>

        {/* Details Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Wedding Details</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Date:</strong> June 15th, 2024
                </p>
                <p>
                  <strong>Time:</strong> 4:00 PM
                </p>
                <p>
                  <strong>Location:</strong> Sandstrand Beach Resort
                </p>
                <p>
                  <strong>Address:</strong> 123 Ocean View Road, Sandstrand
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600">
                Sarah and John met in 2018 during a beach cleanup event. Their shared love for the ocean and commitment to environmental conservation brought them together. After five wonderful years of adventures and growing together, they're excited to start this new chapter of their lives.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
