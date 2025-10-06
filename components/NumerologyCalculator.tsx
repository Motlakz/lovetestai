"use client"

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSortNumericUp, FaHashtag, FaInfoCircle } from 'react-icons/fa';
import { calculateNumerology } from '@/lib/api';
import { NumerologyParticles } from './animations/numerology';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const NameInput: React.FC<InputProps> = ({ placeholder, value, onChange }) => (
    <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        placeholder={placeholder}
        className="w-full p-3 mb-4 bg-blue-900 bg-opacity-20 border border-blue-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm text-blue-100 placeholder-blue-300 placeholder-opacity-70"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />
);

const NumerologyCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState<{ score: number; analysis: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCalculate = async () => {
    if (!name1 || !name2 || !date1 || !date2) return;

    setLoading(true);
    try {
      const data = await calculateNumerology(name1, name2, date1, date2);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setName1('');
    setName2('');
    setDate1('');
    setDate2('');
    setResult(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-yellow-800 to-blue-700 p-4 relative overflow-hidden">
      <NumerologyParticles containerRef={containerRef} />
      <motion.div
        className="max-w-md w-full overflow-y-auto max-h-[550px] num-cal backdrop-blur-lg rounded-xl shadow-lg p-8 border border-blue-300 border-opacity-30 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-yellow-400 highlight"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <FaHashtag className="inline-block mr-2" /> Mystical Numerology Harmony
        </motion.h2>

        <motion.p 
          className="text-blue-600 bg-blue-100 rounded p-2 mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover the cosmic connection between two souls
        </motion.p>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NameInput
                placeholder="Enter your full name"
                value={name1}
                onChange={setName1}
              />
              <motion.input
                whileFocus={{ scale: 1.05 }}
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full p-3 mb-4 bg-blue-900 bg-opacity-20 border border-blue-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm text-blue-100"
              />
              <NameInput
                placeholder="Enter their full name"
                value={name2}
                onChange={setName2}
              />
              <motion.input
                whileFocus={{ scale: 1.05 }}
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full p-3 mb-4 bg-blue-900 bg-opacity-20 border border-blue-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-sm text-blue-100"
              />

              <motion.button
                onClick={handleCalculate}
                disabled={loading || !name1 || !name2 || !date1 || !date2}
                className="w-full flex items-center justify-center bg-yellow-500 bg-opacity-80 text-blue-900 p-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSortNumericUp className="mr-2" />
                {loading ? 'Revealing...' : 'Reveal Your Cosmic Bond'}
              </motion.button>

              {loading && (
                <div className="flex justify-center items-center mt-4">
                  <motion.div
                    className="w-16 h-16 border-4 border-t-yellow-400 border-r-blue-400 border-b-yellow-500 border-l-blue-500 border-solid rounded-full"
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
              <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-300 border-opacity-50 backdrop-blur-sm">
                <motion.div
                  className="text-6xl font-bold text-yellow-400 text-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {result.score}%
                </motion.div>
                <div className="w-full bg-blue-300 bg-opacity-30 rounded-full h-4 mb-4">
                  <motion.div 
                    className="bg-yellow-500 h-4 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <motion.p 
                  className="text-blue-100 mb-6 whitespace-pre-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {result.analysis}
                </motion.p>
                <p className="text-blue-100 text-xs opacity-70 mb-4 text-center">
                  Disclaimer: This is for entertainment purposes only and not a real measure of compatibility.
                </p>
                <motion.button
                  onClick={reset}
                  className="w-full flex items-center justify-center bg-yellow-500 bg-opacity-80 text-blue-900 p-3 rounded-lg font-bold hover:bg-opacity-90 transition duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSortNumericUp className="mr-2" />
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 text-yellow-400"
          onClick={() => setShowInfo(!showInfo)}
        >
          <FaInfoCircle size={24} />
        </motion.button>
        
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 p-4 bg-blue-900 bg-opacity-50 rounded-lg text-blue-100"
            >
              <h3 className="text-xl font-bold mb-2">How it works:</h3>
              <p>Numerology assigns numbers to letters in names. We calculate a number for each name, compare them, and determine compatibility based on their resonance.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NumerologyCalculator;
