'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Menu, X, Calculator, Home, ChevronDown, Star, MoonStar, Infinity, Cookie } from 'lucide-react';
import Image from 'next/image';
import { FaRegGrinHearts } from 'react-icons/fa';
import { TbNumbers } from 'react-icons/tb';

const MotionLink = motion(Link);
const MotionButton = motion.button;

interface NavbarProps {
    updateCookiePreferences?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ updateCookiePreferences }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const calculators = [
        { name: 'Love Calculator', id: 'love-calculator', icon: Heart },
        { name: 'Zodiac Love Calculator', id: 'zodiac-love-calculator', icon: Star },
        { name: 'Birthdate Compatibility', id: 'birthdate-compatibility', icon: MoonStar },
        { name: 'Soulmate Calculator', id: 'soulmate-calculator', icon: Infinity },
        { name: 'Love Quiz', id: 'love-quiz', icon: FaRegGrinHearts },
        { name: 'Numerology Love Calculator', id: 'numerology-love-calculator', icon: TbNumbers }
    ];

    const handleCalculatorClick = useCallback((id: string) => {
        setIsMenuOpen(false);
        setIsCalculatorsOpen(false);

        if (pathname !== '/') {
            router.push(`/#${id}`);
            // Wait for navigation then scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [pathname, router]);

    const handleCookiePreferences = useCallback(() => {
        setIsMenuOpen(false);
        setIsSettingsOpen(false);
        if (updateCookiePreferences) {
            updateCookiePreferences();
        }
    }, [updateCookiePreferences]);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('shadow-lg');
                } else {
                    navbar.classList.remove('shadow-lg');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsCalculatorsOpen(false);
        setIsSettingsOpen(false);
    }, [pathname]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.calculators-dropdown')) {
                setIsCalculatorsOpen(false);
            }
            if (!target.closest('.settings-dropdown')) {
                setIsSettingsOpen(false);
            }
        };

        if (isCalculatorsOpen || isSettingsOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isCalculatorsOpen, isSettingsOpen]);

    return (
        <motion.nav
            id="navbar"
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 backdrop-blur-lg border-b border-white/20 transition-shadow duration-300"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <MotionLink
                        href="/"
                        className="flex items-center highlight"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image 
                            className="h-8 w-8 mr-2" 
                            src={"/heart.png"} 
                            alt="Love Test AI Logo" 
                            width={32}
                            height={32}
                            priority
                        />
                        <h3 className="text-lg font-semibold text-pink-400">Love Test AI</h3>
                    </MotionLink>

                    <div className="hidden md:flex items-center space-x-6">
                        <MotionLink
                            href="/"
                            className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </MotionLink>

                        <div className="relative calculators-dropdown">
                            <MotionButton
                                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:bg-white/20 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCalculatorsOpen(!isCalculatorsOpen);
                                    setIsSettingsOpen(false);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Calculator className="w-4 h-4" />
                                <span>Love Testers</span>
                                <motion.div
                                    animate={{ rotate: isCalculatorsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </MotionButton>

                            <AnimatePresence>
                                {isCalculatorsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-r from-indigo-900/95 to-pink-900/95 backdrop-blur-lg shadow-xl border border-white/20"
                                    >
                                        {calculators.map((calc) => (
                                            <MotionButton
                                                key={calc.id}
                                                onClick={() => handleCalculatorClick(calc.id)}
                                                className="flex items-center space-x-2 w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <calc.icon className="w-4 h-4 text-pink-400" />
                                                <span>{calc.name}</span>
                                            </MotionButton>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <MotionButton
                        className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </MotionButton>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden px-4 border-t border-white/10 bg-gradient-to-r from-indigo-900/95 to-pink-900/95 backdrop-blur-lg"
                    >
                        <motion.div
                            className="py-2 space-y-1"
                            variants={{
                                open: { transition: { staggerChildren: 0.07 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <MotionLink
                                href="/"
                                className="flex items-center mb-6 space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="w-4 h-4" />
                                <span>Home</span>
                            </MotionLink>
                            
                            {calculators.map((calc) => (
                                <MotionButton
                                    key={calc.id}
                                    onClick={() => handleCalculatorClick(calc.id)}
                                    className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <calc.icon className="w-4 h-4" />
                                    <span>{calc.name}</span>
                                </MotionButton>
                            ))}
                            
                            <div className="border-t border-white/10 my-2"></div>
                            
                            <MotionButton
                                onClick={handleCookiePreferences}
                                className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Cookie className="w-4 h-4" />
                                <span>Cookie Preferences</span>
                            </MotionButton>
                            
                            <MotionLink
                                href="/privacy-policy"
                                className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>Privacy Policy</span>
                            </MotionLink>
                            
                            <MotionLink
                                href="/terms-of-service"
                                className="flex items-center space-x-2 w-full px-4 py-3 text-white hover:bg-white/20 transition-colors duration-200 rounded-lg"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>Terms of Service</span>
                            </MotionLink>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
