"use client"

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { calculateZodiacCompatibility } from '@/lib/api';
import { FloatingSymbols, zodiacSigns, zodiacSymbols } from '@/components/animations/zodiac';

const ZodiacSelect: React.FC<{ value: string; onChange: (value: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => (
  <motion.select
      className="w-full p-3 mb-4 bg-indigo-900 bg-opacity-50 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-400 text-indigo-100 placeholder-indigo-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      whileFocus={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
  >
      <option value="">{placeholder}</option>
      {zodiacSigns.map(sign => (
          <option key={sign} value={sign}>{sign} {zodiacSymbols[sign]}</option>
      ))}
  </motion.select>
);

const ZodiacCalculator: React.FC = () => {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [result, setResult] = useState<{ score: number; analysis: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCalculate = async () => {
    if (!sign1 || !sign2) return;

    setLoading(true);
    try {
      const data = await calculateZodiacCompatibility(sign1, sign2);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSign1('');
    setSign2('');
    setResult(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-4 relative overflow-hidden">
      <FloatingSymbols containerRef={containerRef} />
      <div className="relative z-10">
        <motion.div
          className="zodiac-cal max-w-xl w-full bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-indigo-300 border-opacity-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl highlight font-bold mb-6 text-indigo-100 text-center flex items-center justify-center gap-2">
            <FaStar className="text-indigo-300" /> Zodiac Love Oracle
          </h2>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label className="text-indigo-200 text-sm mb-2 block">Your Zodiac Sign</label>
                <ZodiacSelect value={sign1} onChange={setSign1} placeholder="Choose your sign" />

                <label className="text-indigo-200 text-sm mb-2 block">Their Zodiac Sign</label>
                <ZodiacSelect value={sign2} onChange={setSign2} placeholder="Choose your partner's sign" />

                <motion.button
                  onClick={handleCalculate}
                  disabled={loading || !sign1 || !sign2}
                  className="w-full flex items-center bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-600 transition duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaStar className="mr-2" />
                  {loading ? 'Aligning the stars...' : 'Unveil Your Cosmic Connection'}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-bold text-indigo-200 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {result.score}%
                  </motion.div>
                  <div className="text-indigo-100 mb-6 whitespace-pre-wrap text-left">{result.analysis}</div>
                  <p className="text-indigo-300 text-xs opacity-70 mb-6">
                    Disclaimer: This is for entertainment purposes only and not a real measure of compatibility.
                  </p>
                  <motion.button
                    onClick={reset}
                    className="w-full bg-indigo-500 text-white p-3 rounded-lg font-bold hover:bg-indigo-600 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ZodiacCalculator;
