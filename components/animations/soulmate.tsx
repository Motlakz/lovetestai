import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export const HeartParticles: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const size = Math.random() * 15 + 5;
  
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300 text-opacity-30 select-none"
            style={{
              fontSize: `${size}px`,
            }}
            initial={{ 
              x: Math.random() * containerSize.width,
              y: Math.random() * containerSize.height,
              scale: 0
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
              ],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <div className="icons relative">
              <span className="icon icon-1 absolute right-4 text-4xl">∞</span>
              <span className="icon icon-2 text-5xl">❤️</span>
            </div> 
          </motion.div>
        ))}
      </div>
    );
};
