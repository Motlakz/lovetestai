import React from 'react';
import { Linkedin, Github, Twitter, Heart } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { FaCoffee } from 'react-icons/fa';

const links = [
    { name: 'Love Poem Generator', path: '/love-poem-generator', imgUrl: "/love-letter.png" },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br mt-20 from-pink-900 via-purple-900 to-indigo-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="relative">
                                    <Image className="h-10 w-10 mr-3" width={40} height={40} src={"/heart.png"} alt="Logo" />
                                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-pink-400 rounded-full animate-pulse"></div>
                                </div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Love Test AI</h3>
                            </Link>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Discover your love compatibility with our suite of interactive calculators powered by AI technology.
                        </p>
                        <div className="flex items-center space-x-2 pt-2">
                            <Heart className="h-4 w-4 text-pink-400 fill-current" />
                            <span className="text-sm text-gray-300">Made with love for couples</span>
                        </div>
                    </div>
                    
                    {/* Tools Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400 flex items-center">
                            <span className="mr-2">✨</span> Fun Tools
                        </h3>
                        <ul className="space-y-3">
                            {links.map((calc) => (
                                <li key={calc.path}>
                                    <Link href={calc.path} className="flex items-center group">
                                        <div className="bg-white/10 p-2 rounded-lg mr-3 group-hover:bg-pink-500/20 transition-colors duration-200">
                                            <Image src={calc.imgUrl} alt={calc.name} width={24} height={24} />
                                        </div>
                                        <span className="group-hover:text-pink-300 transition-colors duration-200">{calc.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="#" className="flex items-center group">
                                    <div className="bg-white/10 p-2 rounded-lg mr-3 group-hover:bg-pink-500/20 transition-colors duration-200">
                                        <Heart className="h-6 w-6 text-pink-400" />
                                    </div>
                                    <span className="group-hover:text-pink-300 transition-colors duration-200">Compatibility Calculator</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400 flex items-center">
                            <span className="mr-2">💌</span> Support Me
                        </h3>
                        <p>Love my work?</p>
                        <Button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600">
                            <FaCoffee />
                            <Link href="https://www.buymeacoffee.com/motlalepulasello">Buy Me A Coffee</Link>
                        </Button>
                    </div>
                    
                    {/* Social Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-pink-400 flex items-center">
                            <span className="mr-2">🌟</span> Follow Us
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Check out my socials for more exciting tools
                        </p>
                        <div className="flex space-x-3">
                            <Link href="https://www.linkedin.com/in/motlalepula-sello-37956813a/" className="bg-white/10 p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-200">
                                <Linkedin className="h-5 w-5 text-blue-400" />
                            </Link>
                            <Link href="https://www.github.com/in/Motlakz/" className="bg-white/10 p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-200">
                                <Github className="h-5 w-5 text-purple-400" />
                            </Link>
                            <Link href="https://www.twitter.com/MotlalepulaSel6/" className="bg-white/10 p-2 rounded-lg hover:bg-blue-400/20 transition-all duration-200">
                                <Twitter className="h-5 w-5 text-blue-400" />
                            </Link>
                        </div>
                        <div className="mt-4 p-3 bg-white/5 rounded-lg">
                            <p className="text-xs text-gray-400">Join 5,000+ couples who&apos;ve discovered their compatibility!</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400">
                        © 2025 Love Test AI. All rights reserved.
                    </p>
                    <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-pink-300 transition-colors duration-200">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
