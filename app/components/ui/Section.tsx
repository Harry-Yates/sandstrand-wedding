interface SectionProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
    noPadding?: boolean;
}

export function Section({ children, className = '', dark = false, noPadding = false }: SectionProps) {
    return (
        <section className={`
            relative min-h-screen
            ${dark ? 'bg-background-tertiary text-text-primary' : 'bg-background text-text-primary'}
            ${className}
        `}>
            {dark && <div className="absolute inset-0 bg-background-overlay" />}
            <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${noPadding ? '' : 'pt-32 pb-20'}`}>
                {children}
            </div>
        </section>
    );
} 