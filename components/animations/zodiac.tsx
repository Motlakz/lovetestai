"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export const zodiacSymbols: { [key: string]: string } = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

const FloatingSymbol: React.FC<{ symbol: string; containerSize: { width: number; height: number } }> = ({ symbol, containerSize }) => (
    <motion.div
        className="absolute text-indigo-300 opacity-50 pointer-events-none"
        initial={{ 
            x: Math.random() * containerSize.width, 
            y: Math.random() * containerSize.height,
            fontSize: '30px'
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
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            fontSize: ['10px', '20px', '30px', '20px', '10px']
        }}
        transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            repeatType: "reverse" 
        }}
    >
        {symbol}
    </motion.div>
);

export const FloatingSymbols: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({ containerRef }) => {
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
            {Object.values(zodiacSymbols).map((symbol, index) => (
                <FloatingSymbol key={index} symbol={symbol} containerSize={containerSize} />
            ))}
        </div>
    );
};
