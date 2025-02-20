'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
// import { ThemeToggle } from './ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Always include blur background in the navbar,
    // add a shadow if the page is scrolled.
    const navBackground = `bg-background/90 backdrop-blur-lg ${isScrolled ? 'shadow-sm' : ''}`

    const linkClass = `text-sm font-medium transition-colors hover:text-primary ${theme === 'light' ? 'text-text-primary' : 'text-white'}`
    const rsvpClass = "text-sm font-medium px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-light transition-colors"
    const adminClass = linkClass

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
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
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            <Link href="/" className={linkClass}>
                                Home
                            </Link>
                            <Link href="/faq" className={linkClass}>
                                FAQ
                            </Link>
                            <Link href="/admin" className={adminClass}>
                                Admin
                            </Link>
                            <Link href="/rsvp" className={rsvpClass}>
                                RSVP
                            </Link>
                            {/* <ThemeToggle /> */}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={`md:hidden p-2 rounded-md focus:outline-none ${theme === 'light' ? 'text-text-primary' : 'text-white'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
                >
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className={`p-2 rounded-md focus:outline-none ${theme === 'light' ? 'text-text-primary' : 'text-white'}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-center text-xl font-medium transition-colors hover:text-primary ${theme === 'light' ? 'text-text-primary' : 'text-white'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/faq"
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-center text-xl font-medium transition-colors hover:text-primary ${theme === 'light' ? 'text-text-primary' : 'text-white'}`}
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-center text-xl font-medium transition-colors hover:text-primary ${theme === 'light' ? 'text-text-primary' : 'text-white'}`}
                        >
                            Admin
                        </Link>
                        <Link
                            href="/rsvp"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-center text-xl font-medium py-3 px-4 bg-[#d3415d] text-white rounded-full transition-colors hover:bg-[#d3415d]"
                        >
                            RSVP
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
} 