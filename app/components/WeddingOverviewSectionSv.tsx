import Image from "next/image";

// Component for the Wedding Weekend Overview Section in Swedish
export default function WeddingOverviewSectionSv() {
    return (
        <section className="bg-[var(--section-overview)] text-[var(--section-overview-text)] relative">
            <div className="flex flex-col md:flex-row">
                {/* Image Column - Full height, aligned to left edge */}
                <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:bottom-0">
                    <div className="h-[300px] md:h-full w-full relative">
                        <Image
                            src="/assets/images/IMG_5463.jpg"
                            alt="Bröllops bakgrund"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Content Column - Now starts directly with the list */}
                <div className="md:w-1/2 md:ml-[50%] py-16 px-4 md:px-16">
                    {/* Centered Schedule Header */}
                    <h2 className="text-2xl sm:text-3xl bungee-regular mb-8 text-center">
                        Johanna & Sebastians Bröllopshelg!
                    </h2>

                    <ul className="space-y-6">
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                🎾 Torsdag 19 juni – Tennisturnering
                            </strong>
                            Vi kickar igång helgen med Sandstrand Open, en tennisturnering för ALLA! 🎾 Spela, heja eller bara njut av smörgåstårta & rosé.
                            <br />
                            <strong>📍 Plantahagens Tennis Courts</strong> | ⏰ 17:00-21:00
                            <br />
                            <strong>👕 Dresscode:</strong> Wimbledon Chic (vitt, grönt eller rosa)
                            <br />
                            🏆 Bonuspoäng för retro look & dramatisk segerglädje!
                        </li>
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                💍 Fredag 20 juni – Bröllopsdag & Fest!
                            </strong>
                            Det stora ögonblicket! Vi säger &quot;Ja!&quot; och firar med en fantastisk fest. 🥂
                            <br />
                            <strong>⛪ Vigsel:</strong> Hovs Kyrka | ⏰ 14:30
                            <br />
                            <strong>🚌 Bussar avgår 13:40</strong> från Riviera Strand sen till Skansen
                            <br />
                            <strong>💃 Mingel & Midsommardans:</strong> GW Swensons Lada | 16:00-17:30
                            <br />
                            🌸 Middag & fest: Hela kvällen fram till 02:00!
                            <br />
                            <strong>🎨 Dresscode:</strong> Färgfullt & festligt – tänk glada färger, pasteller & sommarvibbar (vi älskar färg så undvik gärna marinblått;)
                        </li>
                        <li className="bg-white/50 p-6 rounded-xl">
                            <strong className="text-xl block mb-2 bungee-regular">
                                🏖 Lördag 21 juni – Strandfest!
                            </strong>
                            Vi rundar av med en solig beach party vid Badkrukan! 🌞🌊
                            <br />
                            <strong>📍 Badkrukan Båstad</strong> | ⏰ Från 13:00 & framåt!
                            <br />
                            🍕 Pizza, drinkar, bad & dans!
                            <br />
                            <strong>👗 Dresscode:</strong> Beach Chic – Somrigt och gött, glöm ej badkläder
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
} 