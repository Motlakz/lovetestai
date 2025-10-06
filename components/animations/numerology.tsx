import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const NumerologyParticles: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const updateSize = () => {
        if (containerRef.current) {
          setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight
          });
        }
      };
  
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, [containerRef]);
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 text-opacity-30 text-4xl font-bold"
            initial={{ 
              x: Math.random() * containerSize.width,
              y: Math.random() * containerSize.height
            }}
            animate={{ 
              x: [
                Math.random() * containerSize.width,
                Math.random() * containerSize.width,
                Math.random() * containerSize.width,
                Math.random() * containerSize.width
              ],
              y: [
                Math.random() * containerSize.height,
                Math.random() * containerSize.height,
                Math.random() * containerSize.height,
                Math.random() * containerSize.height
              ]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
    );
};
