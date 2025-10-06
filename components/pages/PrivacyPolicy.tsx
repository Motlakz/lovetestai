import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Calendar, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };

    const sections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            icon: <FileText className="w-5 h-5" />,
            content: 'Welcome to our calculator application. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains our practices concerning the collection and use of data when you use our calculator.'
        },
        {
            id: 'information',
            title: '2. Information We Collect',
            icon: <Eye className="w-5 h-5" />,
            content: 'We want to be clear that we collect very limited information:',
            list: [
                'We only collect data associated with the components of the calculator that you interact with.',
                'We do not store or save any of the actual values or information you enter into the calculator.'
            ]
        },
        {
            id: 'usage',
            title: '3. How We Use Information',
            icon: <Shield className="w-5 h-5" />,
            content: 'The limited data we collect is used solely for the purpose of improving our calculator\'s functionality and user experience. This includes:',
            list: [
                'Analyzing which features of the calculator are most frequently used.',
                'Identifying any technical issues or areas for improvement in the calculator\'s interface.'
            ]
        },
        {
            id: 'security',
            title: '4. Data Security',
            icon: <Lock className="w-5 h-5" />,
            content: 'We take the security of your information seriously:',
            list: [
                'All calculations are performed locally on your device.',
                'No personal data or calculation inputs are transmitted to our servers or stored by us.'
            ]
        },
        {
            id: 'rights',
            title: '5. Your Rights',
            icon: <Shield className="w-5 h-5" />,
            content: 'As we do not collect or store any personal information you enter, there is no personal data for you to access, modify, or delete. The interaction data we collect is anonymized and cannot be linked back to individual users.'
        },
        {
            id: 'changes',
            title: '6. Changes to This Policy',
            icon: <Calendar className="w-5 h-5" />,
            content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.'
        }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
                <motion.div 
                    className="bg-slate-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div 
                        className="bg-indigo-900 p-8 text-white"
                    >
                        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                        <div className="flex items-center text-indigo-100">
                            <Calendar className="w-4 h-4 mr-2" />
                            <p className="text-sm">Last updated: {new Date().toISOString().split('T')[0]}</p>
                        </div>
                    </motion.div>

                    {/* Table of Contents */}
                    <motion.div 
                        className="p-6 border-b border-white/10"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
                        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="flex items-center text-left p-2 rounded-lg text-indigo-200 hover:bg-white/10 transition-colors duration-200"
                                >
                                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-400" />
                                    <span className="text-sm">{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Content Sections */}
                    <div className="p-6 sm:p-8">
                        {sections.map((section, index) => (
                            <motion.section 
                                key={section.id}
                                id={section.id}
                                className="mb-8 last:mb-0"
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-start mb-4">
                                    <div className="bg-indigo-800/20 p-2 text-white rounded-lg mr-3">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                                </div>
                                
                                <p className="text-gray-200 leading-relaxed mb-4">{section.content}</p>
                                
                                {section.list && (
                                    <ul className="space-y-2 ml-6">
                                        {section.list.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start text-gray-200">
                                                <span className="text-indigo-400 mr-2 mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.section>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PrivacyPolicy;
