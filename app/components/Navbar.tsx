'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navBackground = 'bg-[#ff3e6b]'

    const linkClass = `text-xl font-medium transition-colors text-[#ffe234] hover:text-white font-bungee`

    const rsvpClass = `text-xl font-medium px-4 py-2 rounded-full bg-[#ffe234] text-[#ff3e6b] hover:bg-white transition-colors font-bungee`

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all ${navBackground} ${isScrolled ? 'shadow-lg' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
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
                        <Link href="/" className={linkClass}>
                            Home
                        </Link>
                        <Link href="/faq" className={linkClass}>
                            FAQ
                        </Link>
                        <Link href="/portal" className={linkClass}>
                            Portal
                        </Link>
                        <Link href="/rsvp" className={rsvpClass}>
                            RSVP
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[#ffe234] hover:text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className={`md:hidden absolute top-16 left-0 right-0 ${navBackground} p-4`}>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={linkClass}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/faq"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={linkClass}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/portal"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={linkClass}
                                >
                                    Portal
                                </Link>
                                <Link
                                    href="/rsvp"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={rsvpClass}
                                >
                                    RSVP
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
} 