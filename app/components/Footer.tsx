'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <footer className="bg-[#ff3e6b] text-[#ffe234] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Copyright text */}
                    <p className="text-center font-bungee">
                        © {new Date().getFullYear()} Johanna & Sebastian.
                    </p>

                    {/* Scroll to top button */}
                    <button
                        onClick={scrollToTop}
                        className={`
                            fixed bottom-8 right-8 
                            bg-[#ffe234] text-[#ff3e6b] 
                            rounded-full p-3
                            hover:bg-white transition-all
                            shadow-lg
                            ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                        `}
                        aria-label="Scroll to top"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    )
} 