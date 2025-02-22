import { motion } from 'framer-motion'

interface AnimatedMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

const AnimatedMenuButton = ({ isOpen, onClick }: AnimatedMenuButtonProps) => {
    const transition = { duration: 0.3 }

    return (
        <button
            onClick={onClick}
            className="relative w-8 h-8 text-[#ffe234] hover:text-white focus:outline-none"
        >
            {/* Top line */}
            <motion.span
                className="absolute block w-full h-0.5 bg-current"
                style={{ top: '8px' }}
                animate={isOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={transition}
            />
            {/* Middle line */}
            <motion.span
                className="absolute block w-full h-0.5 bg-current"
                style={{ top: '16px' }}
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={transition}
            />
            {/* Bottom line */}
            <motion.span
                className="absolute block w-full h-0.5 bg-current"
                style={{ top: '24px' }}
                animate={isOpen ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={transition}
            />
        </button>
    )
}

export default AnimatedMenuButton 