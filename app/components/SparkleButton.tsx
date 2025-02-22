'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SparkleButton = () => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        duration: number;
        delay: number;
        alpha: number;
        originX: number;
        originY: number;
        size: number;
    }>>([]);

    useEffect(() => {
        const generateParticles = () => {
            return Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                x: Math.floor(Math.random() * 60 + 20),
                y: Math.floor(Math.random() * 60 + 20),
                duration: Math.floor(Math.random() * 14 + 6),
                delay: Math.floor(Math.random() * 9 + 1),
                alpha: (Math.floor(Math.random() * 50 + 40)) / 100,
                originX: Math.random() > 0.5 ? Math.floor(Math.random() * 500 - 800) : Math.floor(Math.random() * 500 + 300),
                originY: Math.random() > 0.5 ? Math.floor(Math.random() * 500 - 800) : Math.floor(Math.random() * 500 + 300),
                size: (Math.floor(Math.random() * 50 + 40)) / 100
            }));
        };

        setParticles(generateParticles());
    }, []);

    return (
        <div className="sparkle-button relative inline-block group">
            <Link
                href="/rsvp"
                className="
                    relative overflow-hidden
                    inline-flex items-center justify-center
                    px-8 py-4 rounded-full
                    bg-[#ae1231] text-[#e0ab2a]
                    hover:bg-[#ae1231]/90
                    transition-all duration-300
                    font-bungee text-lg sm:text-xl
                    transform hover:scale-105
                    shadow-lg hover:shadow-xl
                    cursor-pointer
                    no-underline
                    z-20 relative
                "
            >
                <span className="spark absolute inset-0 pointer-events-none" />
                <span className="backdrop absolute inset-[0.1em] rounded-full bg-[#ae1231] pointer-events-none" />
                <span className="relative z-10">RSVP Now</span>
            </Link>

            <div className="particle-pen absolute w-[200%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {particles.map((particle) => (
                    <svg
                        key={particle.id}
                        className="particle absolute pointer-events-none"
                        style={{
                            '--x': `${particle.x}`,
                            '--y': `${particle.y}`,
                            '--duration': `${particle.duration}`,
                            '--delay': `${particle.delay}`,
                            '--alpha': particle.alpha,
                            '--origin-x': `${particle.originX}%`,
                            '--origin-y': `${particle.originY}%`,
                            '--size': particle.size,
                        } as React.CSSProperties}
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z"
                            fill="#e0ab2a"
                            stroke="#e0ab2a"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ))}
            </div>

            <style jsx>{`
                .particle {
                    width: calc(var(--size, 0.25) * 1rem);
                    aspect-ratio: 1;
                    position: absolute;
                    top: calc(var(--y) * 1%);
                    left: calc(var(--x) * 1%);
                    opacity: 0;
                    animation: float-out calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
                    transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
                    z-index: -1;
                    pointer-events: none;
                }

                .group:hover .particle {
                    opacity: var(--alpha, 1);
                    animation-play-state: running;
                }

                @keyframes float-out {
                    to {
                        rotate: 360deg;
                    }
                }

                .spark {
                    position: absolute;
                    inset: 0;
                    border-radius: 100px;
                    rotate: 0deg;
                    overflow: hidden;
                    mask: linear-gradient(white, transparent 50%);
                    animation: flip 2.5s infinite steps(2, end);
                    pointer-events: none;
                    opacity: 0;
                }

                .group:hover .spark {
                    opacity: 1;
                }

                @keyframes flip {
                    to {
                        rotate: 360deg;
                    }
                }
            `}</style>
        </div>
    );
};

export default SparkleButton; 