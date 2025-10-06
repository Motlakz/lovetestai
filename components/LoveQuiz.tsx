"use client"

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaEnvelope, FaChevronDown, FaHeart, FaRegGrinHearts, FaUser } from 'react-icons/fa';
import { analyzeLoveCompatibility } from '@/lib/api';
import { loveQuizQuestions, Question } from '@/lib/loveQuizQuestions';
import { RefreshCcw } from 'lucide-react';
import { LoveParticles } from './animations/quiz';
import { NameInput } from './common/NameInput';

const loveLanguages = [
    'Words of Affirmation',
    'Acts of Service',
    'Receiving Gifts',
    'Quality Time',
    'Physical Touch'
] as const;

type LoveLanguage = typeof loveLanguages[number];

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

interface SelectProps extends InputProps {
    options: readonly string[];
}

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options, placeholder }) => {
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
        <div ref={selectRef} className="relative w-full mb-4">
            <motion.div
                className="w-full p-3 bg-violet-500 bg-opacity-10 border border-white border-opacity-30 rounded-lg focus:outline-none focus:border-pink-400 text-white cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <span className={value ? 'text-white' : 'text-white text-opacity-70'}>
                    {value || placeholder}
                </span>
                <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className="custom-select-open absolute z-10 w-full mt-1 bg-purple-500 backdrop-blur-lg border border-white border-opacity-30 rounded-lg overflow-hidden max-h-[190px] overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map(option => (
                            <motion.li
                                key={option}
                                className="p-3 cursor-pointer text-white hover:bg-pink-400 hover:bg-opacity-20 transition-colors duration-200"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {option}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const GlassButton: React.FC<ButtonProps> = ({ onClick, children }) => (
    <motion.button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-pink-700 to-purple-700 text-white p-3 rounded-lg font-bold hover:from-pink-900 hover:to-purple-900 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.button>
);

const LoveQuiz: React.FC = () => {
    const [step, setStep] = useState(0);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [loveLanguage1, setLoveLanguage1] = useState<LoveLanguage | ''>('');
    const [loveLanguage2, setLoveLanguage2] = useState<LoveLanguage | ''>('');
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
    const [compatibilityMeter, setCompatibilityMeter] = useState(50);

    useEffect(() => {
        if (step === 1) {
            setIsWaitingForAPI(true);
            const shuffled = [...loveQuizQuestions].sort(() => 0.5 - Math.random());
            setSelectedQuestions(shuffled.slice(0, 10));
            setIsWaitingForAPI(false);
        }
    }, [step]);

    const getAnswerChoices = (type: Question['type']) => {
        switch (type) {
            case 'frequency':
                return ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
            case 'agreement':
                return ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
            case 'importance':
                return ['Not Important', 'Slightly Important', 'Moderately Important', 'Very Important', 'Extremely Important'];
            case 'comfort':
                return ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'];
            default:
                return ['1', '2', '3', '4', '5'];
        }
    };

    const handleAnswer = (answer: number) => {
        if (currentQuestionIndex >= selectedQuestions.length) return;

        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);
        
        // Update compatibility meter
        const newCompatibility = Math.min(100, Math.max(0, compatibilityMeter + (answer - 3) * 5));
        setCompatibilityMeter(newCompatibility);
    
        if (currentQuestionIndex < selectedQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            const totalScore = newAnswers.reduce((sum, curr) => sum + curr, 0);
            const percentageScore = (totalScore / (selectedQuestions.length * 5)) * 100;
            setScore(Math.round(percentageScore));
            setIsWaitingForAPI(true);
            setStep(step + 1);
            submitQuizResults(percentageScore);
        }
    };
    
    const submitQuizResults = async (percentageScore: number) => {
        try {
            const result = await analyzeLoveCompatibility(
                person1,
                person2,
                loveLanguage1,
                loveLanguage2,
                percentageScore
            );
            setResult(result);
            setIsWaitingForAPI(false);
            setShowResult(true);
        } catch (error) {
            console.error('Error:', error);
            setResult('An error occurred. Please try again.');
            setIsWaitingForAPI(false);
            setShowResult(true);
        }
    };

    const shareResult = (platform: 'facebook' | 'twitter' | 'email') => {
        const message = `I just took the Love Compatibility Quiz with ${person2}! Our score: ${score}%. Find out your love compatibility too!`;
        const url = encodeURIComponent(window.location.href);
        const encodedMessage = encodeURIComponent(message);
    
        let shareUrl = '';
    
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedMessage}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent('Love Compatibility Quiz')}&body=${encodedMessage}%20${url}`;
                break;
        }
    
        if (shareUrl) {
            try {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'noopener,noreferrer');
                }
            } catch (error) {
                console.error('Error sharing:', error);
                alert('Unable to open share dialog. Please try again or use a different sharing method.');
            }
        }
    };

    const restartQuiz = () => {
        setPerson1('');
        setPerson2('');
        setLoveLanguage1('');
        setLoveLanguage2('');
        setAnswers([]);
        setResult('');
        setScore(0);
        setShowResult(false);
        setStep(0);
        setCurrentQuestionIndex(0);
        setCompatibilityMeter(50);
    };

    return (
        <div ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-4 overflow-hidden">
            <motion.div 
                className="quiz-cal max-w-xl w-full overflow-y-auto max-h-[550px] z-10 quiz-cal backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white border-opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="highlight text-3xl font-bold mb-6 flex items-center  gap-2 text-center text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                >
                    <FaRegGrinHearts className="mr-2" />
                    Love Compatibility Quiz
                </motion.h1>
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <NameInput icon={<FaUser />} value={person1} onChange={setPerson1} placeholder="Enter your name" />
                            <NameInput icon={<FaUser />} value={person2} onChange={setPerson2} placeholder="Enter your partner's name" />
                            <CustomSelect 
                                value={loveLanguage1} 
                                onChange={(value) => setLoveLanguage1(value as LoveLanguage)} 
                                options={loveLanguages} 
                                placeholder="Select your love language" 
                            />
                            <CustomSelect 
                                value={loveLanguage2} 
                                onChange={(value) => setLoveLanguage2(value as LoveLanguage)} 
                                options={loveLanguages} 
                                placeholder="Select your partner's love language" 
                            />
                            <GlassButton onClick={() => setStep(1)}>Start Quiz</GlassButton>
                        </motion.div>
                    )}
                     {step === 1 && !isWaitingForAPI && selectedQuestions.length > 0 && (
                        <motion.div
                            key={`question${currentQuestionIndex}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-semibold mb-4 text-white">{selectedQuestions[currentQuestionIndex].text}</h3>
                            <div className="flex flex-col space-y-2">
                                {getAnswerChoices(selectedQuestions[currentQuestionIndex].type).map((choice, index) => (
                                    <GlassButton key={index} onClick={() => handleAnswer(index + 1)}>
                                        {choice}
                                    </GlassButton>
                                ))}
                            </div>
                            <motion.div 
                                className="mt-4 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div 
                                    className="h-full bg-pink-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${(currentQuestionIndex + 1) / selectedQuestions.length * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                            <div className="mt-4 flex items-center justify-between text-white">
                                <span>Question {currentQuestionIndex + 1} of {selectedQuestions.length}</span>
                                <div className="flex items-center">
                                    <FaHeart className="text-pink-500 mr-2" />
                                    <span>{compatibilityMeter}%</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {step === 1 && isWaitingForAPI && (
                        <div className="text-white text-center">Loading questions... <RefreshCcw /></div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-white text-center">Your Love Compatibility Score: {score}%</h3>
                            {isWaitingForAPI ? (
                                <div className="flex justify-center items-center">
                                    <motion.div
                                        className="w-16 h-16 border-4 border-t-pink-500 border-r-purple-400 border-b-rose-500 border-l-indigo-500 border-solid rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            ) : showResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div className="text-white whitespace-pre-wrap">
                                        <ReactMarkdown>{result}</ReactMarkdown>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('facebook')}
                                            className="text-white text-2xl"
                                        >
                                            <FaFacebook />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('twitter')}
                                            className="text-white text-2xl"
                                        >
                                            <FaTwitter />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => shareResult('email')}
                                            className="text-white text-2xl"
                                        >
                                            <FaEnvelope />
                                        </motion.button>
                                    </div>
                                    <div className="mt-6">
                                        <GlassButton onClick={restartQuiz}>Restart Quiz</GlassButton>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <LoveParticles containerRef={containerRef} />
        </div>
    );
};

export default LoveQuiz;
