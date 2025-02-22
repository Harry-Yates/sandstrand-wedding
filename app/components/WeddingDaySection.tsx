import Image from "next/image";

export default function WeddingDaySection() {
    return (
        <section className="bg-[var(--section-wedding)] text-[var(--section-wedding-text)] relative">
            <div className="flex flex-col md:flex-row">
                {/* Image Column - Full height, aligned to left edge */}
                <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0">
                    <div className="h-[300px] md:h-full w-full relative">
                        <Image
                            src="/assets/images/collage.png"
                            alt="Wedding day collage"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Content Column - Now starts after image */}
                <div className="md:w-1/2 md:ml-[50%] py-16 px-4 md:px-16">
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        💍 Sandstrand Wedding Extravaganza! 💃🌸
                    </h2>
                    <h3 className="text-xl text-center mb-4">
                        📅 Friday, June 20th, Midsommarafton
                    </h3>
                    <p className="text-center mb-8">
                        A wedding filled with love, laughter, and midsummer magic! 🌿💖
                    </p>

                    <div className="space-y-6">
                        {/* Schedule Items */}
                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🚌 13:40 - Wedding Buses Depart</h3>
                            <p>Buses will pick up guests from Rivera Strand, Skansen and whisk you away to the ceremony. No need for maps—just good vibes and excitement!</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">⛪ 14:30 - Wedding Ceremony at Hovs Kyrka</h3>
                            <p>Time for the main event! Love will be celebrated, vows will be exchanged, and hearts will be full. 💕</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🚌 15:45 - Buses Depart to GW Swensons Lada</h3>
                            <p>Off to the party! Get ready for an evening of joy, dancing, and celebration.</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🌿 16:30 - Dance Around the Midsummer Pole</h3>
                            <p>Let&aposs keep the Swedish tradition alive! Expect hopping, twirling, and lots of laughter. Comfy shoes are a must! 🐸✨</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🍽️ Dinner, Toasts & Party Until 02:00!</h3>
                            <p>Delicious food, heartfelt speeches, and a dance floor waiting for your best moves—celebrate love until the stars come out, which is early on the brightest day of the year 🪩✨</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🌈 Dress Code: Colorful & Festive</h3>
                            <p>Think bright, joyful, and vibrant-express yourself in color! Suite & dress (NO dark blue! 😉) ✨🌸</p>
                        </div>

                        <p className="text-center mt-8 text-xl">
                            We can&apos;t wait to celebrate with you! 🥂💃
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
} 