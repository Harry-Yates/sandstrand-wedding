import Image from "next/image";

export default function TennisTournamentSection() {
    return (
        <section className="bg-[var(--section-tennis)] text-[var(--section-tennis-text)]">
            {/* Top green section */}
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 py-16 px-4 md:px-16">
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        🎾 Sandstrand Tennis Tournament - Wimbledon&nbsp;Vibes!
                    </h2>

                    {/* Location Info */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <p>📍 Location: Plantahagsvägen 120, Båstad – Grass Courts</p>
                        <p className="mt-2">🚗 Taxi or carpool recommended</p>
                        <p className="mt-2">📅 Thursday, June 19</p>
                    </div>

                    {/* Main Description */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">🎾 Dress Code: Wimbledon Chic</h3>
                        <h3 className="text-xl mb-4 bungee-regular">Game, Set, Love!</h3>
                        <p>We&apos;re kicking off the wedding weekend with a tennis tournament for EVERYONE! No matter your skill level, grab a racket and join the fun—we&apos;ll have mini tennis doubles and regular doubles, so there&apos;s a game for everyone!</p>
                    </div>

                    {/* Schedule */}
                    <div className="bg-white/10 p-6 rounded-xl mb-6">
                        <h3 className="font-bold mb-2">⏰ 17:00 - Sandstrand Tennis Tournament Begins</h3>
                        <p className="mb-4">The battle for the Sandstrand Open trophy kicks off! Get ready to serve, volley, and celebrate love with some friendly(ish) competition.</p>

                        <h3 className="font-bold mb-2">⏰ 21:00 - Sandstrand Open Closes</h3>
                        <p>The final point has been played, the champions have been crowned, and now it&apos;s time to toast to a fantastic evening!</p>
                    </div>
                </div>

                {/* Image Column */}
                <div className="md:w-1/2 relative">
                    <div className="h-[300px] md:h-full w-full relative">
                        <Image
                            src="/assets/images/IMG_3265.png"
                            alt="Wimbledon tennis court"
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom pink section */}
            <div className="bg-[var(--section-tennis-othercolor)]   text-[var(--section-tennis-othercolor-text)] ">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 px-4 md:px-16 py-16">
                        {/* Food & Drinks */}
                        <div className="bg-white/10 p-6 rounded-xl mb-6">
                            <h3 className="font-bold mb-2">🍸 Drinks & Food Served Throughout</h3>
                            <p>Stay fueled with smörgåstårta, rosé, and good vibes 🍰🥂😜</p>
                        </div>

                        {/* Dress Code */}
                        <div className="bg-white/10 p-6 rounded-xl mb-6">
                            <h3 className="font-bold mb-2">🎾 Dress Code: Wimbledon Chic</h3>
                            <p>White, green, or pink—channel your inner Federer, Serena, or McEnroe (tantrums optional).</p>
                            <p className="mt-2">Playing? Wear active tennis attire so you can move, run, and (attempt to) smash some winners! Don&apos;t Forget to Bring a Racket.</p>
                            <p className="mt-2">Watching? Dress like a stylish Wimbledon spectator—think summer whites, polos, and chic tennis dresses.</p>
                        </div>

                        {/* Bonus Points */}
                        <div className="bg-white/10 p-6 rounded-xl">
                            <h3 className="font-bold mb-2">🏆 Bonus Points for:</h3>
                            <ul className="list-inside">
                                <li>✅ Sweatbands & vintage tennis looks</li>
                                <li>✅ Dramatic &quot;LET&apos;S GOOO!&quot; celebrations</li>
                                <li>✅ Gracefully accepting defeat (or pretending it never happened)</li>
                            </ul>
                            <p className="mt-4">Let the games—and the wedding festivities—begin! 💍✨</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="h-[300px] md:h-full w-full relative">
                            <div className="absolute top-0 left-0 w-1/2 h-full">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/assets/images/drinks.png"
                                        alt="Tennis ball on grass court"
                                        className="object-cover"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-1/2 h-full">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/assets/images/wimbledon.png"
                                        alt="Tennis net close-up"
                                        className="object-cover"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 