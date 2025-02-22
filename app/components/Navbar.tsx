'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import AnimatedMenuButton from './AnimatedMenuButton'

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

    const navBackground = isMenuOpen
        ? 'bg-[#ff3e6b]'
        : `${isScrolled
            ? 'md:bg-[#ff3e6b] bg-transparent backdrop-blur-sm'
            : 'bg-[#ff3e6b]'
        }`

    const linkClass = `text-xl font-medium transition-colors text-[#ffe234] hover:text-white font-bungee`

    const rsvpClass = `text-xl font-medium px-4 py-2 rounded-full bg-[#ffe234] text-[#ff3e6b] hover:bg-white transition-colors font-bungee`

    return (
        <nav className={`fixed w-full top-0 z-[100] transition-all ${navBackground} ${isScrolled ? 'shadow-lg' : ''} rsvp-form`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group" onClick={() => setIsMenuOpen(false)}>
                        <div className="logo-container">
                            <img
                                src="/assets/images/IMG_7858.jpg"
                                alt="Johanna and Sebastian"
                                className="h-14 w-14 rounded-full object-cover logo-image transition-transform duration-1000 ease-in-out animate-[spin_5s_linear_infinite]"
                            />
                            <div className="logo-border"></div>
                        </div>
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
                    <div className="md:hidden relative z-[101]">
                        <AnimatedMenuButton
                            isOpen={isMenuOpen}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className={`md:hidden fixed inset-0 ${navBackground} flex items-center justify-center h-screen w-screen`}>
                            <div className="flex flex-col space-y-8 items-center">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${linkClass} text-3xl`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/faq"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${linkClass} text-3xl`}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/portal"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${linkClass} text-3xl`}
                                >
                                    Portal
                                </Link>
                                <Link
                                    href="/rsvp"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${rsvpClass} text-3xl`}
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