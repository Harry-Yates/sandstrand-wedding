import Image from "next/image";

export default function BeachPartySection() {
    return (
        <section className="bg-[var(--section-beach)] text-[var(--section-beach-text)] relative">
            {/* Show first image on top for mobile */}
            <div className="md:hidden relative h-[300px] w-full">
                <Image
                    src="/assets/images/IMG_8841.jpg"
                    alt="Beach party collage"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Content Column */}
                <div className="md:w-1/2 py-16 px-4 md:px-16">
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        🏖️ Beach Party!
                    </h2>

                    <h3 className="text-xl text-center mb-4">
                        📅 Saturday, June 21st | 📍 Badkrukan Båstad at 13.00
                    </h3>

                    <p className="text-center mb-8">
                        Sun, sea, and one last celebration! 🌞✨
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🍕 Pizza Buffet & Drinks</h3>
                            <p>Because beach parties need fuel!</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">🌊 Swim, dance, and relax</h3>
                            <p>With good vibes & music!</p>
                        </div>

                        <div className="bg-white/20 p-6 rounded-xl">
                            <h3 className="text-xl mb-4 bungee-regular">👗 Dress Code: Beach Chic</h3>
                            <p>Flowy dresses, linen shirts, and swimsuits underneath!</p>
                        </div>

                        <p className="text-center mt-8 text-xl">
                            Let&apos;s soak up the sun & keep the party going! 🎶💛
                        </p>
                    </div>
                </div>

                {/* Image Column - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block md:w-1/2">
                    <div className="h-full w-full relative flex flex-col">
                        <div className="relative h-1/2 w-full">
                            <Image
                                src="/assets/images/IMG_8841.jpg"
                                alt="Beach party collage"
                                fill
                                priority
                                className="object-cover"
                                sizes="50vw"
                            />
                        </div>
                        <div className="relative h-1/2 w-full">
                            <Image
                                src="/assets/images/IMG_1143.jpg"
                                alt="Beach party collage"
                                fill
                                priority
                                className="object-cover"
                                sizes="50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Show second image at bottom for mobile */}
            <div className="md:hidden relative h-[300px] w-full">
                <Image
                    src="/assets/images/IMG_1143.jpg"
                    alt="Beach party collage"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
        </section>
    );
} 