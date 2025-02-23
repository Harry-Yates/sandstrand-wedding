import Image from "next/image";

// Component for the Wedding Weekend Overview Section
export default function WeddingOverviewSection() {
    return (
        <section className="bg-[var(--section-overview)] text-[var(--section-overview-text)] relative">
            <div className="flex flex-col md:flex-row">
                {/* Image Column - Full height, aligned to left edge */}
                <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0">
                    <div className="h-[300px] md:h-full w-full relative">
                        <picture>
                            <source
                                media="(max-width: 768px)"
                                srcSet="/assets/images/IMG_1081-landscape.webp"
                            />
                            <Image
                                src="/assets/images/IMG_1081-landscape.webp"
                                alt="Wedding background"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </picture>
                    </div>
                </div>

                {/* Content Column - Now starts directly with the list */}
                <div className="md:w-1/2 md:ml-[50%] py-16 px-4 md:px-16">
                    {/* Centered Schedule Header */}
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        Wedding Weekend&nbsp;Overview
                    </h2>

                    <ul className="space-y-6">
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                🎾 June 19 – Tennis Tournament
                            </strong>
                            <strong>Plantahagens Tennis Courts</strong> | ⏰ 17:00-21:00
                            <br />
                            <strong>Dress Code:</strong> Wimbledon Chic (white, green, or pink)
                            <br />
                            Featuring smörgåstårta & rosé wine 🍷✨
                        </li>
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                💒 June 20 – Wedding&nbsp;Party
                            </strong>
                            <strong>Hovs Kyrka</strong> | ⏰ 14:30 Ceremony
                            <br />
                            <strong>Buses leave 13:40</strong> (Only from Riviera Strand &amp; Skansen)
                            <br />
                            <strong>Mingle 16:00-17:30</strong> at GW Swensons Lada
                            <br />
                            Dinner party until 02:00
                            <br />
                            <strong>Dress Code:</strong> Colourful dress & suite (NO dark blue!)
                        </li>
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                🏖️ June 21 – Beach Party
                            </strong>
                            <strong>Badkrukan</strong> | 🍕 Pizza & Drinks ⏰ 13:00 Party starts
                            <br />
                            Swim, dance, and celebrate!
                            <br />
                            <strong>Dress Code:</strong> Beach Chic
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
} 