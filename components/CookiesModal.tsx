"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowClose, FaLock, FaChartLine, FaBullhorn, FaCog } from 'react-icons/fa';

// Define cookie consent types
type CookieConsent = {
  essential: boolean; // Always true for functionality
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
};

type CookieCategory = {
  id: keyof Omit<CookieConsent, 'timestamp' | 'version'>;
  name: string;
  description: string;
  icon: React.ReactNode;
  required?: boolean;
};

const CookiesModal: React.FC<{
  onAcceptAll: () => void;
  onAcceptEssential: () => void;
  onCustomize: (preferences: Omit<CookieConsent, 'timestamp' | 'version'>) => void;
  cookiesEnabled: boolean;
}> = ({ onAcceptAll, onAcceptEssential, onCustomize, cookiesEnabled }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<Omit<CookieConsent, 'timestamp' | 'version'>>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  const cookieCategories: CookieCategory[] = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      icon: <FaLock />,
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
      icon: <FaChartLine />
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to make advertising messages more relevant to you and your interests.',
      icon: <FaBullhorn />
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      description: 'These cookies enable the website to remember choices you make to provide enhanced functionality.',
      icon: <FaCog />
    }
  ];

  useEffect(() => {
    // Check if cookies are enabled
    if (!cookiesEnabled) {
      setIsVisible(true);
      return;
    }

    // Check if user has already made a choice
    const cookiesConsent = localStorage.getItem('cookieConsent');
    if (!cookiesConsent) {
      setIsVisible(true);
    }
  }, [cookiesEnabled]);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookiePreferences(allAccepted);
    setIsVisible(false);
    onAcceptAll();
  };

  const handleAcceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookiePreferences(essentialOnly);
    setIsVisible(false);
    onAcceptEssential();
  };

  const handleSavePreferences = () => {
    setIsVisible(false);
    onCustomize(cookiePreferences);
  };

  const toggleCookieCategory = (categoryId: keyof Omit<CookieConsent, 'timestamp' | 'version'>) => {
    if (categoryId === 'essential') return; // Essential cookies cannot be toggled
    setCookiePreferences(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const AnimatedCookie = () => {
    return (
      <motion.div
        className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl relative overflow-hidden shadow-lg"
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🍪
        <motion.div
          className="absolute w-2 h-2 bg-yellow-600 rounded-full"
          animate={{
            x: [0, 5, -5, 0],
            y: [0, -5, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-yellow-600 rounded-full"
          animate={{
            x: [0, -5, 5, 0],
            y: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 min-h-screen bg-black/50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-pink-50 to-indigo-50 shadow-2xl"
          >
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-indigo-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <AnimatedCookie />
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                    <p className="text-pink-100 text-sm mt-1">
                      {cookiesEnabled ? 'We use cookies to enhance your experience' : 'Cookies are disabled in your browser'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-white hover:text-pink-200 transition-colors"
                >
                  <FaWindowClose size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.
              </p>

              <div className="mb-6">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:text-pink-600 transition-colors"
                >
                  <span>Customize your preferences</span>
                  <motion.div
                    animate={{ rotate: showDetails ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4">
                        {cookieCategories.map((category) => (
                          <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3 text-pink-500">
                                {category.icon}
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                                  <button
                                    onClick={() => toggleCookieCategory(category.id)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                      cookiePreferences[category.id] ? 'bg-pink-500' : 'bg-gray-300'
                                    } ${category.required ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={category.required}
                                  >
                                    <span
                                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        cookiePreferences[category.id] ? 'translate-x-6' : 'translate-x-1'
                                      }`}
                                    />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                {category.required && (
                                  <p className="text-xs text-pink-500 mt-1">Always required</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  Accept All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAcceptEssential}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  Essential Only
                </motion.button>
                {showDetails && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium shadow-md hover:shadow-lg transition-shadow"
                  >
                    Save Preferences
                  </motion.button>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By using our site, you acknowledge that you have read and understood our{' '}
                  <a href="/privacy-policy" className="text-pink-500 hover:underline">Privacy Policy</a> and{' '}
                  <a href="/terms-of-service" className="text-pink-500 hover:underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiesModal;
