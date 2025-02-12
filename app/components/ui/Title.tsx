interface TitleProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    dark?: boolean;
}

export function Title({
    children,
    as: Component = 'h1',
    className = '',
    dark = false
}: TitleProps) {
    const baseStyles = {
        h1: 'text-4xl md:text-5xl font-bold mb-6',
        h2: 'text-3xl md:text-4xl font-bold mb-4',
        h3: 'text-2xl md:text-3xl font-bold mb-3'
    }[Component];

    return (
        <Component className={`
      ${baseStyles}
      text-text-primary
      ${className}
    `}>
            {children}
        </Component>
    );
} 