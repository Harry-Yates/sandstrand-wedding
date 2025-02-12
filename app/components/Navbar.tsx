'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <img
                            src="https://img.freepik.com/premium-vector/monogram-logo-with-initials-js-wedding-logo-design-custom-wreath-wedding-monogram-crest-initial-wedding-logo_553860-762.jpg"
                            alt="JS Monogram Logo"
                            className="h-12 w-12 rounded-full object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/details"
                            className={`text-sm font-medium hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        >
                            Details
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-medium hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/rsvp"
                            className="ml-4 px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
                        >
                            RSVP Now
                        </Link>
                        <Link
                            href="/admin"
                            className={`text-sm font-medium hover:text-rose-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        >
                            Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 rounded-md hover:text-rose-600 focus:outline-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-8 w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-8 w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-black/80 backdrop-blur-sm">
                        <div className="px-4 py-6 space-y-4">
                            <Link
                                href="/"
                                className="block text-center text-white hover:text-rose-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/details"
                                className="block text-center text-white hover:text-rose-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Details
                            </Link>
                            <Link
                                href="/contact"
                                className="block text-center text-white hover:text-rose-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/admin"
                                className="block text-center text-white hover:text-rose-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </Link>
                            <div className="pt-4 border-t border-gray-600">
                                <Link
                                    href="/rsvp"
                                    className="block w-full py-3 text-center bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    RSVP Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
} 