'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
// import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/context/ThemeContext'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { theme } = useTheme()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Determine if we're on the FAQ page
    const isOnFAQ = pathname === '/faq'

    // Match FAQ page colours: bg-[#ede457] and text-[#cd0b5c]
    const navBackground = isOnFAQ ? 'bg-[#ede457]' : 'bg-[#c7436c]'

    const linkClass = `text-xl font-medium transition-colors ${isOnFAQ
        ? 'text-[#cd0b5c] hover:text-[#8a0940]'
        : 'text-[#e0ab2a] hover:text-[#ae1231]'
        } font-bungee`

    const rsvpClass = `text-xl font-medium px-4 py-2 rounded-full ${isOnFAQ
        ? 'bg-[#cd0b5c] text-[#ede457] hover:bg-[#8a0940]'
        : 'bg-[#ae1231] text-[#e0ab2a] hover:bg-[#352129]'
        } transition-colors font-bungee`

    const portalClass = linkClass

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all ${navBackground} ${isScrolled ? 'shadow-lg' : ''
            }`}>
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
                        <Link href="/portal" className={portalClass}>
                            Portal
                        </Link>
                        <Link href="/rsvp" className={rsvpClass}>
                            RSVP
                        </Link>
                        {/* <ThemeToggle /> */}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[#e0ab2a] hover:text-[#ae1231] focus:outline-none"
                        >
                            {isMenuOpen ? (
                                // Close icon
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Menu icon
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
                                    href="/portal"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-3xl font-medium transition-colors ${isOnFAQ
                                        ? 'text-[#cd0b5c] hover:text-[#8a0940]'
                                        : 'text-[#e0ab2a] hover:text-[#ae1231]'
                                        } font-bungee`}
                                >
                                    Portal
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
} 