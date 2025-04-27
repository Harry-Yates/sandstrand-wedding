'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqItems: FAQItem[] = [
    // Tennis Tournament
    {
        category: "Tennis Tournament",
        question: "Do I need to be a tennis pro to join the tournament?",
        answer: "Absolutely not! Whether you're channeling your inner Federer or just here for the post-game drinks, everyone is welcome. Just let us know if you're playing \"just for fun\" or competitively as we will prepare the teams."
    },
    {
        category: "Tennis Tournament",
        question: "What should I wear to the tournament?",
        answer: "Wimbledon chic, baby! White, green, or pink. Bonus points for vintage sweatbands, dramatic \"let's gooo!\" celebrations, and gracefully accepting (or denying) defeat."
    },

    // Wedding Day Details
    {
        category: "Wedding Day",
        question: "What's happening at the wedding?",
        answer: "A magical midsummer wedding! Expect a beautiful ceremony, traditional Swedish dancing around the midsummer pole, so please bring a pair of extra shoes as Små grodorna dance might be involved💃"
    },

    // Dress Code & Attire
    {
        category: "Dress Code",
        question: "Is there a dress code for the wedding?",
        answer: "Yes! Colorful & festive—no dark blue! Think bold colours or pastel."
    },
    {
        category: "Dress Code",
        question: "I don't understand all the different dress codes?!",
        answer: "No worries, we got you! 🎨✨\n" +
            "🎾 Wimbledon (Tennis Day): Sporty, but make it stylish! Think tennis whites, green, or pink. Bonus points for headbands & vintage vibes!\n" +
            "💍 Wedding Day: COLOUR, COLOUR, COLOUR! It can be bright or pastel. We LOVE color and want to celebrate our midsummer wedding in style! It would be fantastic if this could be the first wedding with no navy blue in sight;)\n" +
            "🏖 Beach Day: Just chill & comfy. Barefoot? Yes. Sand between your toes? Absolutely. 🏝️"
    },
    {
        category: "Dress Code",
        question: "Do I need to wear a tie?",
        answer: "Not at all! Ditch the tie, bring the colour! Think summer vibes, not boardroom meetings. 🎨🌞"
    },

    // Transportation & Accommodation
    {
        category: "Transportation & Accommodation",
        question: "How do I get to the wedding?",
        answer: "We have arranged buses from Riviera Strand or Skansen båstad. If you don't stay there then you need to arrange your own transportation or hop on a bus from any of the hotels."
    },
    {
        category: "Transportation & Accommodation",
        question: "Where am I staying?",
        answer: "That's up to you, we have reserved rooms at Hotel Torekov, Skansen, Riviera. Those rooms will be released 12 weeks before the wedding starts. (27th of march!)."
    },
    {
        category: "Transportation & Accommodation",
        question: "How do I get around?",
        answer: "Buses are provided for the main wedding events, from the two main hotels (rivera & skansen). For everything else, plan your own transport—or make friends with someone with a car! 🚗💨"
    },
    {
        category: "Transportation & Accommodation",
        question: "How do I get around if I don't have a car or am not near the pick-up hotels?",
        answer: "Easy! Either befriend someone with a car or <a href='https://taxiengelholm.se/' target='_blank' rel='noopener noreferrer' style='color: #ff3e6b;'>book a taxi</a> 🚖 Uber is also an option!"
    },
    {
        category: "Transportation & Accommodation",
        question: "Will there be an earlier bus from the wedding party?",
        answer: "Nope! Our one wish? That you dance your heart out until 2 AM! 🪩💃 But if your inner Cinderella needs to leave early, you'll need to arrange your own ride. 🚕✨"
    },

    // Beach Party
    {
        category: "Beach Party",
        question: "What's the plan for the beach party on Saturday?",
        answer: "Join us for an afternoon of good vibes, music, and seaside fun at Badkrukan! Whether you want to dance in the sand, relax with a drink, or take a dip in the sea, this is the perfect way to keep the party going!"
    },
    {
        category: "Beach Party",
        question: "What should I wear to the beach party?",
        answer: "Beach club chic! Flowy dresses, linen shirts, swimsuits underneath. Bonus points for sun hats and barefoot dancing!"
    },

    // General Questions
    {
        category: "General",
        question: "What if I have dietary restrictions?",
        answer: "No problem! Just let us know in the rsvp questionnaire so we can make sure you're well-fed and happy."
    },
    {
        category: "General",
        question: "Can I come for just one day?",
        answer: "Of course! Just let us know which day(s) you'll be joining."
    },
    {
        category: "General",
        question: "Are children welcome?",
        answer: "As much as we adore tiny humans, this is an adults-only celebration—except for a few newborn VIPs."
    },
    {
        category: "General",
        question: "Can I bring a plus-one?",
        answer: "If you've got a plus-one, you'll already know! Not sure? Give Johanna & Sebastian a quick check-in. 💌"
    },
    {
        category: "General",
        question: "Why is the website in English?",
        answer: "Because we've got amazing guests jetting in from Australia, England & France! 🇦🇺🇬🇧🇫🇷"
    },
    {
        category: "General",
        question: "🎁 Gifts",
        answer: "Your presence is the best gift we could ask for! ❤️<br/><br/>" +
            "But if you want to help us remember this amazing day for years to come, we'd be thrilled with a gift card from <a href='https://www.svenskttenn.com/se/sv/sortiment/presentkort/' target='_blank' rel='noopener noreferrer' style='color: #ff3e6b;'>Svenskt Tenn</a>. (You can choose any amount, even a little love starting from 100 kr. 💌)"
    },
    {
        category: "Wedding Day",
        question: "Where is the venue and how do I get there?",
        answer: "The wedding ceremony is at Hovs Kyrka, Församlingsvägen 9, 26974 Västra Karup, followed by a reception at GW Swensons Lada, Dagshögsvägen 41, 269 95 Båstad—wedding buses will whisk you away from Riviera Strand and Skansen."
    },
    {
        category: "Wedding Day",
        question: "What time does the event end?",
        answer: "The party goes strong until 2 AM—bring your best stamina and dance moves! 💃🕺"
    },
    {
        category: "Wedding Day",
        question: "Can I take photos during the ceremony?",
        answer: "We've got a photographer capturing all the magic, so feel free to be present and soak in the moment. If you must take a sneaky pic, just be mindful and keep it low-key! 📸"
    },
    {
        category: "Wedding Day",
        question: "Will the wedding be indoors or outdoors?",
        answer: "Both as it all depends on the weather ☀️"
    },
    {
        category: "Wedding Day",
        question: "What happens if it rains?",
        answer: "It's Sweden—anything is possible! But don't worry, we have a backup plan ready."
    }
];

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    // Get unique categories
    const categories = ["All", ...new Set(faqItems.map(item => item.category))];

    const filteredFAQs = selectedCategory === "All"
        ? faqItems
        : faqItems.filter(item => item.category === selectedCategory);

    const toggleItem = (index: number) => {
        setExpandedItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <main className="min-h-screen bg-[#ff3e6b] pt-32 pb-20">
            <Navbar />
            <div className="container mx-auto px-4">
                <h1 className="text-[#ffe234] text-6xl md:text-8xl font-bungee mb-16 text-center mt-8 relative z-50">
                    FAQ
                </h1>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 justify-center mb-8 relative z-50">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full font-bungee text-sm transition-all
                                ${selectedCategory === category
                                    ? 'bg-[#ffe234] text-[#ff3e6b] shadow-lg scale-105'
                                    : 'bg-white/90 text-[#ff3e6b] hover:bg-[#ffe234] hover:scale-105'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Unique arrangement of decorative elements for FAQ */}
                {/* Large top-right feature */}
                <div className="absolute top-20 right-0 w-48 h-48 md:w-72 md:h-72 text-[#ff1744] opacity-15 transform -rotate-12 z-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Mid-left cluster */}
                <div className="absolute top-1/3 -left-20 w-36 h-36 md:w-56 md:h-56 text-[#ff1744] opacity-20 transform rotate-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Small floating elements */}
                <div className="absolute top-1/2 right-1/4 w-20 h-20 md:w-32 md:h-32 text-[#ff1744] opacity-25 transform rotate-90">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Bottom scattered elements */}
                <div className="absolute bottom-1/3 left-1/4 w-24 h-24 md:w-40 md:h-40 text-[#ff1744] opacity-30 transform -rotate-30">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Bottom right element */}
                <div className="absolute bottom-20 right-10 w-32 h-32 md:w-48 md:h-48 text-[#ff1744] opacity-20 transform rotate-180">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* Small accent elements */}
                <div className="absolute top-1/4 left-1/3 w-16 h-16 md:w-24 md:h-24 text-[#ff1744] opacity-15 transform -rotate-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 10 
                                C60 10, 70 20, 70 30
                                C70 40, 90 40, 90 50
                                C90 60, 70 60, 70 70
                                C70 80, 60 90, 50 90
                                C40 90, 30 80, 30 70
                                C30 60, 10 60, 10 50
                                C10 40, 30 40, 30 30
                                C30 20, 40 10, 50 10Z"
                            fill="currentColor" />
                    </svg>
                </div>

                {/* FAQ Items */}
                <div className="relative grid gap-4 max-w-4xl mx-auto mb-20">
                    {filteredFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full text-left p-6 flex justify-between items-center"
                            >
                                <h2 className="text-[#ff3e6b] text-xl font-bungee pr-8">{faq.question}</h2>
                                <ChevronDownIcon
                                    className={`w-6 h-6 text-[#ff3e6b] transition-transform duration-300 ${expandedItems.includes(index) ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out
                                    ${expandedItems.includes(index) ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <div
                                    className="p-6 pt-0 text-[#2d3748] prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}