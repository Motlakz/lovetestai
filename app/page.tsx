/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaStar, FaCalendar, FaHashtag, 
  FaSearch, FaRegGrinHearts 
} from 'react-icons/fa';
import StarryBackground from '@/components/StarryBackground';
import LoveCalculator from '@/components/LoveCalculator';
import ZodiacCalculator from '@/components/ZodiacCalculator';
import BirthdateCalculator from '@/components/BirthdateCalculator';
import NumerologyCalculator from '@/components/NumerologyCalculator';
import SoulmateFinder from '@/components/SoulmateFinder';
import LoveQuiz from '@/components/LoveQuiz';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import NativeAdCard from '@/components/AnimatedLoveTestAdCard';
import SupportPopup from '@/components/SupportModal';
import CookiesModal from '@/components/CookiesModal';

type CalculatorType = 
  | 'home' 
  | 'love' 
  | 'zodiac' 
  | 'birthdate' 
  | 'numerology' 
  | 'soulmate' 
  | 'quiz';

// Define cookie consent types
type CookieConsent = {
  essential: boolean; // Always true for functionality
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
};

const calculators = [
  {
    id: 'love' as CalculatorType,
    title: 'Love Calculator',
    description: 'Calculate your love compatibility score',
    icon: FaHeart,
    color: 'from-pink-500 to-rose-500',
    background: 'from-pink-500/30 to-rose-500/30'
  },
  {
    id: 'zodiac' as CalculatorType,
    title: 'Zodiac Match',
    description: 'Check astrological compatibility',
    icon: FaStar,
    color: 'from-purple-500 to-indigo-500',
    background: 'from-purple-500/30 to-indigo-500/30'
  },
  {
    id: 'birthdate' as CalculatorType,
    title: 'Birthday Match',
    description: 'Analyze birthdate compatibility',
    icon: FaCalendar,
    color: 'from-teal-500 to-cyan-500',
    background: 'from-teal-500/30 to-cyan-500/30'
  },
  {
    id: 'numerology' as CalculatorType,
    title: 'Numerology',
    description: 'Discover numerological harmony',
    icon: FaHashtag,
    color: 'from-blue-500 to-yellow-500',
    background: 'from-blue-500/30 to-yellow-500/30'
  },
  {
    id: 'soulmate' as CalculatorType,
    title: 'Soulmate Finder',
    description: 'Find your ideal match',
    icon: FaSearch,
    color: 'from-red-500 to-pink-500',
    background: 'from-red-500/30 to-pink-500/30'
  },
  {
    id: 'quiz' as CalculatorType,
    title: 'Love Quiz',
    description: 'Take our compatibility quiz',
    icon: FaRegGrinHearts,
    color: 'from-purple-500 to-pink-500',
    background: 'from-purple-500/30 to-pink-500/30'
  }
];

// Cookie utility functions
const CookieManager = {
  // Check if cookies are enabled in the browser
  areCookiesEnabled: (): boolean => {
    try {
      document.cookie = "testcookie=1";
      const ret = document.cookie.indexOf("testcookie=") !== -1;
      document.cookie = "testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return ret;
    } catch (e) {
      console.error('Error checking cookies:', e);
      return false;
    }
  },

  // Get cookie consent from localStorage
  getCookieConsent: (): CookieConsent | null => {
    try {
      if (typeof window === 'undefined') return null;
      const consentData = localStorage.getItem('cookieConsent');
      if (!consentData) return null;
      
      const consent = JSON.parse(consentData) as CookieConsent;
      
      // Check if consent is still valid (1 year)
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      if (Date.now() - consent.timestamp > oneYear) {
        return null;
      }
      
      // Check if version matches current version
      if (consent.version !== '1.0') {
        return null;
      }
      
      return consent;
    } catch (e) {
      console.error('Error reading cookie consent:', e);
      return null;
    }
  },

  // Save cookie consent to localStorage
  saveCookieConsent: (consent: Omit<CookieConsent, 'timestamp' | 'version'>): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      const fullConsent: CookieConsent = {
        ...consent,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      localStorage.setItem('cookieConsent', JSON.stringify(fullConsent));
      return true;
    } catch (e) {
      console.error('Error saving cookie consent:', e);
      return false;
    }
  },

  // Set a cookie
  setCookie: (name: string, value: string, days: number = 30): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
      return true;
    } catch (e) {
      console.error('Error setting cookie:', e);
      return false;
    }
  },

  // Get a cookie value
  getCookie: (name: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (e) {
      console.error('Error getting cookie:', e);
      return null;
    }
  }
};

export default function Home() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('home');
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(false);

  // Initialize cookie consent
  useEffect(() => {
    // Check if cookies are enabled
    const enabled = CookieManager.areCookiesEnabled();
    setCookiesEnabled(enabled);
    
    if (!enabled) {
      console.warn('Cookies are disabled in this browser');
      return;
    }
    
    // Get existing consent
    const consent = CookieManager.getCookieConsent();
    setCookieConsent(consent);
    
    // Show cookie modal if no consent exists
    if (!consent) {
      setShowCookieModal(true);
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAllCookies = useCallback(() => {
    const consent: Omit<CookieConsent, 'timestamp' | 'version'> = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    const success = CookieManager.saveCookieConsent(consent);
    if (success) {
      setCookieConsent({
        ...consent,
        timestamp: Date.now(),
        version: '1.0'
      });
      setShowCookieModal(false);
      
      // Initialize analytics if consented
      if (consent.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  // Handle accepting only essential cookies
  const handleAcceptEssentialCookies = useCallback(() => {
    const consent: Omit<CookieConsent, 'timestamp' | 'version'> = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    const success = CookieManager.saveCookieConsent(consent);
    if (success) {
      setCookieConsent({
        ...consent,
        timestamp: Date.now(),
        version: '1.0'
      });
      setShowCookieModal(false);
    }
  }, []);

  // Handle custom cookie preferences
  const handleCustomizeCookies = useCallback((preferences: Omit<CookieConsent, 'timestamp' | 'version'>) => {
    const success = CookieManager.saveCookieConsent(preferences);
    if (success) {
      setCookieConsent({
        ...preferences,
        timestamp: Date.now(),
        version: '1.0'
      });
      setShowCookieModal(false);
      
      // Initialize analytics if consented
      if (preferences.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  // Initialize analytics tracking
  const initializeAnalytics = useCallback(() => {
    // This would initialize your analytics service
    // For example: Google Analytics, Mixpanel, etc.
    console.log('Analytics initialized');
  }, []);

  // Update cookie preferences
  const updateCookiePreferences = useCallback(() => {
    setShowCookieModal(true);
  }, []);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'love': return <LoveCalculator />;
      case 'zodiac': return <ZodiacCalculator />;
      case 'birthdate': return <BirthdateCalculator />;
      case 'numerology': return <NumerologyCalculator />;
      case 'soulmate': return <SoulmateFinder />;
      case 'quiz': return <LoveQuiz />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar updateCookiePreferences={updateCookiePreferences} />
      <StarryBackground />

      <div className="relative z-10 mt-20 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {activeCalculator === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl"
            >
              <motion.div
                className="text-center mb-12 highlight"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-500">
                  Love Test AI
                </h1>
                <p className="text-xl text-white opacity-90">
                  Discover your perfect match through stars, numbers, and destiny
                </p>
              </motion.div>

              <NativeAdCard />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculators.map((calc, index) => {
                  const Icon = calc.icon;
                  return (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCalculator(calc.id)}
                      className="cursor-pointer"
                    >
                      <div
                        className={`bg-gradient-to-br ${calc.background} backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/20 hover:border-white/40 transition-all duration-300 h-full`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${calc.color} flex items-center justify-center mb-4 mx-auto shadow-md`}
                        >
                          <Icon className="text-3xl text-white drop-shadow-md" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 highlight">
                          {calc.title}
                        </h3>
                        <p className="text-white opacity-80">{calc.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <motion.button
                onClick={() => setActiveCalculator('home')}
                className="mb-6 px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Home
              </motion.button>
              {renderCalculator()}
            </motion.div>
          )}
        </AnimatePresence>
        <SupportPopup />
        {showCookieModal && (
          <CookiesModal 
            onAcceptAll={handleAcceptAllCookies}
            onAcceptEssential={handleAcceptEssentialCookies}
            onCustomize={handleCustomizeCookies}
            cookiesEnabled={cookiesEnabled}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}
