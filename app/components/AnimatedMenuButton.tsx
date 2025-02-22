import { motion } from 'framer-motion'

interface AnimatedMenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

const AnimatedMenuButton = ({ isOpen, onClick }: AnimatedMenuButtonProps) => {
    // Define a spring transition for a lively effect
    const transition = { type: 'spring', stiffness: 500, damping: 30 }

    return (
        <motion.button
            onClick={onClick}
            className="relative w-10 h-10 text-[#ffe234] hover:text-white focus:outline-none"
            whileTap={{ scale: 0.9 }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            {/* Top line */}
            <motion.span
                className="absolute bg-current"
                style={{ width: '24px', height: '2px', left: '50%', marginLeft: '-12px' }}
                variants={{
                    closed: { y: -6, rotate: 0, scale: 1 },
                    open: { y: 0, rotate: 45, scale: 1.1 }
                }}
                transition={transition}
            />
            {/* Middle line */}
            <motion.span
                className="absolute bg-current"
                style={{ width: '24px', height: '2px', left: '50%', marginLeft: '-12px' }}
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
            />
            {/* Bottom line */}
            <motion.span
                className="absolute bg-current"
                style={{ width: '24px', height: '2px', left: '50%', marginLeft: '-12px' }}
                variants={{
                    closed: { y: 6, rotate: 0, scale: 1 },
                    open: { y: 0, rotate: -45, scale: 1.1 }
                }}
                transition={transition}
            />
        </motion.button>
    )
}

export default AnimatedMenuButton 