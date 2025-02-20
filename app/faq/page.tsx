'use client';

import { useState } from 'react';
import { Container, Title, Section } from '@/components/ui';
import Navbar from '@/components/Navbar';

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

    // Transportation & Accommodation
    {
        category: "Transportation & Accommodation",
        question: "How do I get to the wedding?",
        answer: "We have arranged buses from Riviera Strand or Skansen båstad. If you don't stay there then you need to arrange your own transportation or hop on a bus from any of the hotels."
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
        category: "Transportation & Accommodation",
        question: "Where am I staying?",
        answer: "That's up to you, we have reserved rooms at Hotel Torekov, Skansen, Riviera. Those rooms will be released 12 weeks before the wedding starts. (27th of march!)."
    },
    {
        category: "General",
        question: "Can I come for just one day?",
        answer: "Of course! Just let us know which day(s) you'll be joining."
    },
    {
        category: "Transportation & Accommodation",
        question: "How do I get around?",
        answer: "Buses are provided for the main wedding events, from the two main hotels (rivera & skansen). For everything else, plan your own transport—or make friends with someone with a car! 🚗💨"
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
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = ["All", ...Array.from(new Set(faqItems.map(item => item.category)))];

    const filteredFAQs = selectedCategory === "All"
        ? faqItems
        : faqItems.filter(item => item.category === selectedCategory);

    return (
        <>
            <Navbar />
            <Section dark>
                <Container>
                    <Title dark>Frequently Asked Questions</Title>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 mt-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${selectedCategory === category
                                        ? 'bg-primary text-white'
                                        : 'bg-background-secondary text-text-primary hover:bg-primary/10'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 space-y-4 max-w-3xl mx-auto">
                        {filteredFAQs.map((item, index) => (
                            <div
                                key={index}
                                className="bg-background-secondary rounded-lg overflow-hidden"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-background-tertiary transition-colors"
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                >
                                    <span className="text-text-primary font-medium">{item.question}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 text-text-secondary transition-transform ${expandedIndex === index ? 'transform rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {expandedIndex === index && (
                                    <div className="px-6 py-4 border-t border-border">
                                        <p className="text-text-primary whitespace-pre-line">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
} 