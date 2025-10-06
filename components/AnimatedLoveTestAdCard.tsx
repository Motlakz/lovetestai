"use client"

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    Cake,
    Brain,
    Search,
    Star,
    LucideIcon
} from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { FaSortNumericUp } from 'react-icons/fa';

interface CardProps {
    title: string,
    color: string,
    icon: IconType | LucideIcon,
    isActive: boolean,
    onClick: () => void
}

const CalculatorCard = ({ title, color, icon: IconType, isActive, onClick }: CardProps) => (
    <motion.div
        className="p-4 rounded-xl bg-white backdrop-blur-sm shadow-sm border border-gray-200 transition-all duration-300 cursor-pointer"
        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
    >
        <div className="flex flex-col items-center gap-2">
            <div className={`p-2 rounded-full ${color}`}>
                <IconType className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
    </motion.div>
);

const NativeAdCard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [matchPercent, setMatchPercent] = useState(85);

    const steps = useMemo(() => [
        {
            id: "love-calculator",
            icon: Heart,
            title: "Classic Love Calculator",
            description: "Simple and classic way to test your love compatibility",
            color: "bg-pink-500",
            cta: "Calculate Now",
            matchPercent: 85
        },
        {
            id: "zodiac-love-calculator",
            icon: Star,
            title: "Zodiac Love Compass",
            description: "Find love written in the stars",
            color: "bg-indigo-500",
            cta: "Read Stars",
            matchPercent: 92
        },
        {
            id: "birthdate-compatibility",
            icon: Cake,
            title: "Birthday Love Match",
            description: "Find how your birth dates align in love",
            color: "bg-green-500",
            cta: "Match Dates",
            matchPercent: 78
        },
        {
            id: "soulmate-calculator",
            icon: Search,
            title: "Soulmate Finder",
            description: "Connect with your destined partner",
            color: "bg-rose-500",
            cta: "Find Love",
            matchPercent: 95
        },
        {
            id: "love-quiz",
            icon: Brain,
            title: "Quiz Compatibility",
            description: "Test your compatibility through fun questions",
            color: "bg-purple-500",
            cta: "Start Quiz",
            matchPercent: 88
        },
        {
            id: "numerology-love-calculator",
            icon: FaSortNumericUp,
            title: "Numerology",
            description: "Discover your spiritual love connection through numbers",
            color: "bg-blue-500",
            cta: "Reveal Numbers",
            matchPercent: 76
        },
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [steps.length]);

    // Update match percentage when active step changes
    useEffect(() => {
        setMatchPercent(steps[activeStep].matchPercent);
    }, [activeStep, steps]);

    return (
        <motion.div
            className="w-full py-12 px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl bg-pink-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-12 gap-8 p-8 md:p-12">
                    <div className="md:col-span-8 space-y-8">
                        <div className="grid grid-cols-3 gap-4">
                            {steps.map((calc, index) => (
                                <CalculatorCard 
                                    key={index}
                                    title={calc.title.split(' ')[0]}
                                    color={calc.color}
                                    icon={calc.icon}
                                    isActive={activeStep === index}
                                    onClick={() => setActiveStep(index)}
                                />
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-4"
                            >
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {steps[activeStep].title}
                                </h2>
                                <p className="text-lg text-gray-600">
                                    {steps[activeStep].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="md:col-span-4 flex items-center justify-center">
                        <motion.div 
                            className="relative w-full max-w-xs"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="#e5e7eb"
                                            strokeWidth="12"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="64"
                                            cy="64"
                                            r="56"
                                            stroke="url(#gradient)"
                                            strokeWidth="12"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 56}`}
                                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - matchPercent / 100)}`}
                                            strokeLinecap="round"
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#6366f1" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.span 
                                            className="text-3xl font-bold text-gray-800"
                                            key={matchPercent}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {matchPercent}%
                                        </motion.span>
                                    </div>
                                </div>
                                <div className="text-gray-700 font-medium mb-4">Love Match</div>
                                <div className="flex justify-center text-pink-500">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Heart className="w-8 h-8 fill-current" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NativeAdCard;
