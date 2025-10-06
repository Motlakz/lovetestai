"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaStarAndCrescent, FaInfoCircle } from 'react-icons/fa';
import { calculateBirthdateCompatibility } from '@/lib/api';
import { FloatingIcon } from './animations/birthday';

const BirthdateCalculator: React.FC = () => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState<{ score: number; analysis: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!date1 || !date2) return;

    setLoading(true);
    try {
      const data = await calculateBirthdateCompatibility(date1, date2);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDate1('');
    setDate2('');
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-800 via-cyan-700 to-teal-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, index) => (
          <FloatingIcon key={index} index={index} />
        ))}
      </div>
      <motion.div
        className="max-w-xl w-full overflow-y-auto max-h-[550px] num-cal bg-teal-600 bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-teal-300 border-opacity-30 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center highlight text-teal-100"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <FaStarAndCrescent className="inline-block mr-2" /> Cosmic Love Compatibility
        </motion.h2>

        <p className="text-teal-600 bg-teal-100 p-2 rounded mb-4 text-center">
          <FaInfoCircle className="inline-block mr-2" />
          Enter birthdates to discover your cosmic connection!
        </p>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mb-4">
                <label className="text-teal-100 font-semibold mb-2 flex items-center">
                  <FaCalendar className="mr-2" /> Your Birthdate
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full p-3 bg-teal-900 bg-opacity-30 border border-teal-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm text-teal-100 placeholder-teal-200 placeholder-opacity-70"
                />
              </div>

              <div className="mb-4">
                <label className="text-teal-100 font-semibold mb-2 flex items-center">
                  <FaCalendar className="mr-2" /> Their Birthdate
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full p-3 bg-teal-900 bg-opacity-30 border border-teal-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm text-teal-100 placeholder-teal-200 placeholder-opacity-70"
                />
              </div>

              <motion.button
                onClick={handleCalculate}
                disabled={loading || !date1 || !date2}
                className="w-full bg-teal-600 bg-opacity-70 text-teal-100 p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm border border-teal-400 border-opacity-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaStarAndCrescent className="mr-2" />
                {loading ? 'Consulting the Stars...' : 'Calculate Cosmic Compatibility'}
              </motion.button>

              {loading && (
                <div className="flex justify-center items-center mt-4">
                  <motion.div
                    className="w-16 h-16 border-4 border-t-teal-400 border-r-cyan-400 border-b-teal-500 border-l-cyan-500 border-solid rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mt-6 p-4 bg-teal-900 bg-opacity-30 rounded-lg border border-teal-300 border-opacity-50 backdrop-blur-sm">
                <motion.div
                  className="text-6xl font-bold text-teal-100 text-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {result.score}%
                </motion.div>
                <div className="w-full bg-teal-300 bg-opacity-30 rounded-full h-4 mb-4">
                  <motion.div 
                    className="bg-teal-400 h-4 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="text-teal-100 mb-6 whitespace-pre-wrap">{result.analysis}</div>
                <p className="text-teal-100 text-xs opacity-70 mb-4 text-center">
                  Disclaimer: This is for entertainment purposes only and not a real measure of compatibility.
                </p>
                <motion.button
                  onClick={reset}
                  className="w-full bg-teal-600 bg-opacity-70 text-teal-100 p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm border border-teal-400 border-opacity-50 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaStarAndCrescent className="mr-2" />
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BirthdateCalculator;