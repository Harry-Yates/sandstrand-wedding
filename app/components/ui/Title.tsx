interface TitleProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    dark?: boolean;
    variant?: 'default' | 'dark' | 'light' | 'primary' | 'ocean';
}

export function Title({
    children,
    as: Component = 'h1',
    className = '',
    dark = false,
    variant = 'default',
}: TitleProps) {
    const baseStyles = {
        h1: 'text-4xl md:text-5xl font-bold mb-6',
        h2: 'text-3xl md:text-4xl font-bold mb-4',
        h3: 'text-2xl md:text-3xl font-bold mb-3'
    }[Component];

    const variantStyles = {
        default: dark ? 'text-text-primary' : 'text-text-secondary',
        dark: 'text-gray-900',
        light: 'text-white',
        primary: 'text-primary',
        ocean: 'text-[#4AA3D9]'  // A nice ocean blue that complements pink
    }[variant];

    return (
        <Component className={`
            ${baseStyles}
            bungee-regular text-center
            ${variantStyles}
            ${className}
        `}>
            {children}
        </Component>
    );
} 