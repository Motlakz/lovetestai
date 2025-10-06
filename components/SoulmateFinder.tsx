"use client"

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfinity } from 'react-icons/fa';
import { findSoulmate } from '@/lib/api';
import { HeartParticles } from './animations/soulmate';
import { zodiacSigns } from './animations/zodiac';

const loveLanguages = [
  'Words of Affirmation',
  'Acts of Service',
  'Receiving Gifts',
  'Quality Time',
  'Physical Touch'
];

const interestOptions = [
  'Travel', 'Reading', 'Sports', 'Music', 'Art', 'Cooking',
  'Movies', 'Gaming', 'Fitness', 'Photography', 'Dancing', 'Nature'
];

const InputField: React.FC<{ type: string; placeholder?: string; value: string; onChange: (value: string) => void }> = ({ type, placeholder, value, onChange }) => (
  <motion.input
    type={type}
    placeholder={placeholder}
    className="w-full p-3 mb-4 bg-black/20 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 text-pink-200 placeholder-pink-300 placeholder-opacity-70"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    whileFocus={{ scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  />
);

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean }> = ({ onClick, children, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className="w-full bg-rose-400 flex items-center justify-center text-white p-3 rounded-lg font-bold hover:bg-rose-500 transition duration-300 disabled:opacity-50"
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
  >
    <FaInfinity className='mr-2' /> {children}
  </motion.button>
);

const SoulmateFinder: React.FC = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [loveLanguage, setLoveLanguage] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [result, setResult] = useState<{ analysis: string; traits: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInterestToggle = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleCalculate = async () => {
    if (!name || !birthday || !zodiacSign || !loveLanguage || interests.length === 0) return;

    setLoading(true);
    try {
      const data = await findSoulmate({ name, birthday, zodiacSign, interests, loveLanguage });
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setName('');
    setBirthday('');
    setZodiacSign('');
    setLoveLanguage('');
    setInterests([]);
    setResult(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-400 via-violet-400 to-red-400 p-4 relative overflow-hidden">
      <motion.div
        className="soul-cal max-w-xl w-full overflow-y-auto max-h-[550px] soul-cal bg-pink-600/20 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-rose-200 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="highlight text-3xl font-bold mb-6 flex items-center justify-center text-rose-200"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <FaInfinity className="mr-2" /> Soulmate Finder
        </motion.h1>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InputField
                type="text"
                placeholder="Your name"
                value={name}
                onChange={setName}
              />

              <label className="text-pink-200 text-sm mb-2 block">Your Birthday</label>
              <InputField
                type="date"
                value={birthday}
                onChange={setBirthday}
              />

              <label className="text-pink-200 text-sm mb-2 block">Your Zodiac Sign</label>
              <motion.select
                value={zodiacSign}
                onChange={(e) => setZodiacSign(e.target.value)}
                className="w-full p-3 mb-4 bg-black/20 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 text-pink-200"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <option value="" disabled className="bg-pink-900">Select your sign</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign} className="bg-pink-900">{sign}</option>
                ))}
              </motion.select>

              <label className="text-pink-200 text-sm mb-2 block">Your Love Language</label>
              <motion.select
                value={loveLanguage}
                onChange={(e) => setLoveLanguage(e.target.value)}
                className="w-full p-3 mb-4 bg-black/20 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-300 text-pink-200"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <option value="" disabled className="bg-pink-900">Select your love language</option>
                {loveLanguages.map(lang => (
                  <option key={lang} value={lang} className="bg-pink-900">{lang}</option>
                ))}
              </motion.select>

              <label className="text-pink-200 text-sm mb-2 block">Your Interests (select at least one)</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {interestOptions.map(interest => (
                  <motion.button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      interests.includes(interest)
                        ? 'bg-rose-400 text-white'
                        : 'bg-black/20 text-pink-200 border-2 border-pink-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {interest}
                  </motion.button>
                ))}
              </div>

              <Button
                onClick={handleCalculate}
                disabled={loading || !name || !birthday || !zodiacSign || !loveLanguage || interests.length === 0}
              >
                {loading ? 'Finding...' : 'Find My Soulmate'}
              </Button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-rose-200 mb-4">Your Ideal Soulmate</h3>
                <div className="text-pink-200 mb-6 whitespace-pre-wrap text-left">{result.analysis}</div>

                <div className="text-left mb-6">
                  <h4 className="text-lg font-semibold text-rose-200 mb-2">Key Traits to Look For:</h4>
                  <ul className="list-disc list-inside text-pink-200 space-y-1">
                    {result.traits.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-pink-200 text-xs opacity-70 mb-6">
                  Disclaimer: This is for entertainment purposes only and not real relationship advice.
                </p>
                <Button onClick={reset}>
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <HeartParticles containerRef={containerRef} />
    </div>
  );
};

export default SoulmateFinder;
