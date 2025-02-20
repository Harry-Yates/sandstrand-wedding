import Image from "next/image";

export default function TennisTournamentSection() {
    return (
        <section className="bg-[#1B8B6A] relative text-white">
            <div className="flex flex-col md:flex-row">
                {/* Content Column - Comes first in mobile view */}
                <div className="md:w-1/2 py-16 px-4 md:px-16">
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8">
                        🎾 Sandstrand Tennis Tournament - Wimbledon&nbsp;Vibes!
                    </h2>

                    {/* Location Info */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <p>📍 Location: Plantahagavägen 120, 26995 Båstad, Grass Tennis Courts</p>
                        <p className="mt-2">🚗 Own transport necessary, taxi or carpool</p>
                        <p className="mt-2">📅 Thursday 19th of June</p>
                    </div>

                    {/* Main Description */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="text-xl mb-4 bungee-regular">Game, Set, Love!</h3>
                        <p>Join us for a smashing start to our wedding celebrations with an epic grass court showdown. Whether you're a seasoned pro or just here for the vibes, this will be a night of fun, laughter, and maybe even a few questionable backhands.</p>
                    </div>

                    {/* Schedule */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">⏰ 17:00 - Sandstrand Tennis Tournament Begins</h3>
                        <p className="mb-4">The battle for the Sandstrand Open trophy kicks off! Get ready to serve, volley, and celebrate love with some friendly(ish) competition.</p>

                        <h3 className="font-bold mb-2">⏰ 21:00 - Sandstrand Open Closes</h3>
                        <p>The final point has been played, the champions have been crowned, and now it's time to toast to a fantastic evening!</p>
                    </div>

                    {/* Food & Drinks */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">🍷 Drinks & Food Served Throughout</h3>
                        <p>Refreshments and delicious bites will be available to keep you fueled for the court and the celebrations. We're all about smörgåstårta and rosé 🥂✨🌸</p>
                    </div>

                    {/* Dress Code */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">👗 Dress Code: Wimbledon Chic</h3>
                        <p>White, green, or pink—channel your inner Federer, Serena, or McEnroe (tantrums optional).</p>
                    </div>

                    {/* Bonus Points */}
                    <div className="bg-white/10 p-6 rounded-xl">
                        <h3 className="font-bold mb-2">⭐ Bonus Points for:</h3>
                        <ul className="list-disc list-inside">
                            <li>Sweatbands & vintage tennis looks</li>
                            <li>Dramatic "let's gooo!" celebrations</li>
                            <li>Gracefully accepting defeat (or pretending it never happened)</li>
                        </ul>
                        <p className="mt-4">Let the games—and the wedding festivities—begin! 🎾✨</p>
                    </div>
                </div>

                {/* Image Column - Full height, aligned to right edge */}
                <div className="md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0">
                    <div className="h-[300px] md:h-full w-full relative grid grid-cols-2 grid-rows-2 gap-2">
                        <Image
                            src="/assets/images/tennis-1.jpg"
                            alt="Wimbledon court"
                            fill
                            className="object-cover col-span-2"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <Image
                            src="/assets/images/tennis-2.jpg"
                            alt="Tennis details"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <Image
                            src="/assets/images/tennis-3.jpg"
                            alt="Tennis atmosphere"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
} 