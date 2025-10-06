/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, Sparkles, Star, Gift } from 'lucide-react';

const HeartConfetti = ({ isVisible }: { isVisible: boolean }) => {
    if (!isVisible) return null;
    
    return Array.from({ length: 15 }).map((_, index) => (
        <motion.div
            key={index}
            initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
            }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
            }}
            className="absolute text-purple-400/30"
        >
            <Heart className="w-4 h-4 fill-current" />
        </motion.div>
    ));
};

const SupportPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeEmoji, setActiveEmoji] = useState(0);

    const emojis = [
        { icon: Heart, gradient: "from-purple-500 to-pink-500", label: "Love" },
        { icon: Star, gradient: "from-pink-500 to-rose-500", label: "Magic" },
        { icon: Gift, gradient: "from-rose-500 to-purple-500", label: "Joy" },
        { icon: Sparkles, gradient: "from-purple-400 to-pink-600", label: "Sparkle" }
    ];

    useEffect(() => {
        const lastVisit = localStorage.getItem('lastVisit');
        const isReturnUser = !!lastVisit;
        
        localStorage.setItem('lastVisit', new Date().toISOString());
        
        const initialDelay = isReturnUser ? 60000 : 120000;
        
        const initialTimer = setTimeout(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, initialDelay);

        const recurringTimer = setInterval(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, 120000);

        const emojiInterval = setInterval(() => {
            setActiveEmoji((prev) => (prev + 1) % emojis.length);
        }, 2000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(recurringTimer);
            clearInterval(emojiInterval);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-purple-900/50 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <HeartConfetti isVisible={isOpen} />
                    
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-3xl backdrop-blur-lg bg-gradient-to-br from-purple-50/95 via-pink-50/95 to-indigo-50/95 border border-white/20 shadow-2xl p-8 max-w-md mx-4"
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <HeartConfetti isVisible={true} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-center gap-4 mb-6">
                                {emojis.map((emoji, index) => (
                                    <motion.div
                                        key={index}
                                        className={`rounded-full p-3 ${
                                            activeEmoji === index 
                                                ? `bg-gradient-to-r ${emoji.gradient} text-white`
                                                : 'bg-purple-100 text-purple-500'
                                        }`}
                                        whileHover={{ scale: 1.1 }}
                                        animate={activeEmoji === index ? { 
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        } : {}}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <emoji.icon className="w-6 h-6" />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center">
                                <motion.h2 
                                    className="text-2xl font-bold text-purple-900 mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Found Your Perfect Match?
                                </motion.h2>
                                <motion.p 
                                    className="text-purple-800/80 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Help us keep spreading love! Support our love-matching magic with a virtual coffee ☕
                                </motion.p>

                                <motion.a
                                    href="https://buymeacoffee.com/motlalepulasello"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Coffee className="w-5 h-5" />
                                    <span>Buy Me A Coffee</span>
                                    <Sparkles className="w-5 h-5" />
                                </motion.a>

                                <motion.div 
                                    className="mt-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <button
                                        onClick={handleClose}
                                        className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                                    >
                                        Maybe Later
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SupportPopup;
