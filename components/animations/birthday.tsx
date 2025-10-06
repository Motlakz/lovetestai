import { motion } from "framer-motion"
import { FaStar, FaMoon } from "react-icons/fa"

export const FloatingIcon: React.FC<{ index: number }> = ({ index }) => {
    const icons = [FaStar, FaMoon];
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 20 + 10; // Random size between 10px and 30px
    
    return (
        <motion.div
            className="absolute text-teal-200 text-opacity-70 pointer-events-none"
            style={{
                fontSize: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
            }}
            animate={{ 
                top: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                left: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                ],
                scale: [0, 1, 1, 0],
                rotate: [0, 180, 360, 0],
            }}
            transition={{ 
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: index * 0.2 // Stagger the animations
            }}
        >
            <Icon />
        </motion.div>
    );
};
