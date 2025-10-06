"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaHeart, FaHourglass, FaInfoCircle, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { calculateLoveScore } from '@/lib/api';
import { StarryHeart } from './animations/love-test';
import { NameInput } from './common/NameInput';

const relationshipStatuses = [
  { value: 'Single (Crushing)', label: 'Single (Crushing)' },
  { value: 'Dating', label: 'Dating' },
  { value: 'In a Relationship', label: 'In a Relationship' },
  { value: 'Engaged', label: 'Engaged' },
  { value: 'Married', label: 'Married' }
];

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
              setIsOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  return (
      <div ref={selectRef} className="relative mb-4">
          <motion.div
              className="w-full p-3 bg-pink-900/20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 backdrop-blur-sm text-white flex justify-between items-center cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
          >
              <span>{value ? options.find(opt => opt.value === value)?.label : "Select relationship status"}</span>
              <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
          </motion.div>
          <AnimatePresence>
              {isOpen && (
                  <motion.div
                      className="absolute z-20 w-full mt-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                  >
                      {options.map((option) => (
                          <motion.div
                              key={option.value}
                              className="p-3 cursor-pointer text-gray-800 hover:bg-red-100 transition duration-150"
                              onClick={() => {
                                  onChange(option.value);
                                  setIsOpen(false);
                              }}
                              whileHover={{ backgroundColor: "rgba(254, 202, 202, 0.5)" }}
                          >
                              {option.label}
                          </motion.div>
                      ))}
                  </motion.div>
              )}
          </AnimatePresence>
      </div>
  );
};

const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<{ score: number; insight: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!name1 || !name2 || !relationshipStatus || !duration) return;

    setLoading(true);
    try {
      const data = await calculateLoveScore(name1, name2, relationshipStatus, duration);
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
    setRelationshipStatus('');
    setDuration('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-gradient-to-br from-red-400 to-pink-500 p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, index) => (
          <StarryHeart key={index} index={index} />
        ))}
      </div>
      <motion.div
        className="love-cal max-w-xl w-full bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-pink-300 border-opacity-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-center text-white highlight"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <FaHeart className="inline-block mr-2" /> Love Calculator
        </motion.h1>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <div className="relative mb-4">
                <FaHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <NameInput
                  placeholder="Enter your name"
                  value={name1}
                  onChange={setName1}
                  icon={<FaHeart className='text-white' />}
                />
              </div>
              <div className="relative mb-4">
                <FaHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <NameInput
                  placeholder="Enter love interest's name"
                  value={name2}
                  onChange={setName2}
                  icon={<FaHeart className='text-white' />}
                />
              </div>
              <CustomSelect value={relationshipStatus} onChange={setRelationshipStatus} options={relationshipStatuses} />
              <NameInput placeholder="Time together (e.g., 2 years)" value={duration} onChange={setDuration} icon={<FaHourglass className='text-white' />} />
              <motion.button
                onClick={handleCalculate}
                disabled={loading || !name1 || !name2 || !relationshipStatus || !duration}
                className="w-full bg-red-500 bg-opacity-70 text-white p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="mr-2" />
                {loading ? 'Calculating...' : 'Calculate Love Score'}
              </motion.button>
              {loading && (
                <div className="flex justify-center items-center mt-4">
                  <motion.div
                    className="w-16 h-16 border-4 border-t-pink-500 border-r-purple-400 border-b-rose-500 border-l-indigo-500 border-solid rounded-full"
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
              <div className="mt-6 p-4 bg-pink-800/20 rounded-lg border border-white border-opacity-30 backdrop-blur-sm">
                <motion.p 
                  className="text-6xl font-bold text-white text-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {result.score}%
                </motion.p>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-4">
                  <motion.div 
                    className="bg-pink-300 h-4 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-white mb-4">
                  <FaInfoCircle className="inline mr-2" />
                  {result.insight}
                </p>
                <div className="text-white text-center italic mb-4">
                  <FaQuoteLeft className="inline mr-2" />
                  {result.message}
                  <FaQuoteRight className="inline ml-2" />
                </div>
                <p className="text-white text-xs opacity-70 mb-4 text-center">
                  Disclaimer: This is for entertainment purposes only and not a real measure of compatibility.
                </p>
                <motion.button
                  onClick={reset}
                  className="w-full bg-pink-600 border text-white p-3 rounded-lg font-bold hover:bg-opacity-80 transition duration-300 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart className="mr-2" />
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

export default LoveCalculator;