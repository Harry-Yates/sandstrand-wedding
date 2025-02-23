import Image from "next/image";

export default function WeddingDaySection() {
    return (
        <section className="bg-[var(--section-wedding)] text-[var(--section-wedding-text)] relative">
            <div className="flex flex-col md:flex-row">
                {/* Image Column - Full height, aligned to left edge */}
                <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0">
                    <div className="h-[600px] md:h-full w-full relative flex flex-col">
                        <div className="relative h-1/2 w-full">
                            <Image
                                src="/assets/images/IMG_4396.jpg"
                                alt="Wedding day collage"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="relative h-1/2 w-full flex">
                            <div className="relative w-1/2 h-full">
                                <Image
                                    src="/assets/images/IMG_9430.jpg"
                                    alt="Wedding day collage"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                            <div className="relative w-1/2 h-full">
                                <Image
                                    src="/assets/images/disco.png"
                                    alt="Wedding day collage"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Column - Now starts after image */}
                <div className="md:w-1/2 md:ml-[50%] py-16 px-4 md:px-16">
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        💍 The Wedding Day
                    </h2>
                    <h3 className="text-xl text-center mb-4">
                        📅 Friday, June 20th – Midsommarafton
                    </h3>
                    <p className="text-center mb-8">
                        A wedding filled with love, laughter, and midsummer magic! 🌿💖
                    </p>

                    <div className="space-y-6">
                        {/* Schedule Items */}
                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🚌 13:40 - Wedding Buses Depart</h3>
                            <p>Buses will pick up guests from Riviera Strand & Skansen and take you straight to the ceremony.</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">⛪ 14:30 - Wedding Ceremony at Hovs Kyrka</h3>
                            <p>The big moment! We&apos;ll say &quot;I do,&quot; you might shed a happy tear (or two), and love will be in the air. 💕</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🚌 15:45 - Buses Depart to GW Swensons Lada</h3>
                            <p>Time to head to the party! Get ready for an evening of joy, dancing, and all the good vibes.</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🌿 16:30 - Dance Around the Midsummer Pole</h3>
                            <p>Let&apos;s embrace Swedish traditions! Expect hopping, twirling, and lots of laughter. Comfortable shoes highly recommended! 🐸✨</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">💃🍽️ 🌸 Dinner, Toasts & Party Until 02:00!</h3>
                            <p>Delicious food, brutally honest (but loving) roasts, and a dance floor begging for your wildest moves 🔥🪩✨</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🚌 Return Transport</h3>
                            <p>Buses will pick you up at 02:00 and drop off at Skansen & Riviera</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🌈 Dress Code: Colorful & Festive 🎨</h3>
                            <p>We LOVE color and want to celebrate our midsummer wedding in style! Bright, joyful shades or soft and dreamy pastels—suits & dresses in any fun, vibrant, or light color are perfect.</p>
                            <p className="mt-2">🚫 Kindly avoid navy blue. Let&apos;s make this a rainbow of happiness! ✨🌸</p>
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