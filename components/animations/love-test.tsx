import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export const StarryHeart: React.FC<{ index: number }> = ({ index }) => {
  const size = Math.random() * 20 + 10;
  return (
    <motion.div
      className="absolute text-pink-300 text-opacity-70 pointer-events-none"
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
        delay: index * 0.2
      }}
    >
      <FaHeart />
    </motion.div>
  );
};
