import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoveParticlesProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export const LoveParticles: React.FC<LoveParticlesProps> = ({ containerRef }) => {
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
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-pink-300 text-opacity-50"
                    style={{
                        fontSize: `${Math.random() * 20 + 10}px`,
                    }}
                    initial={{ 
                        x: Math.random() * containerSize.width,
                        y: Math.random() * containerSize.height,
                        opacity: 0
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
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    👩‍❤️‍👨
                </motion.div>
            ))}
        </div>
    );
};
