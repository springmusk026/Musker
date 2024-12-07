import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiRobot2Line, RiMessage2Line, RiLightbulbLine, RiShieldLine } from 'react-icons/ri';
import { FiArrowRight, FiCpu, FiGithub, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Snowfall from './Snowfall';

const HomePage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const featuresRef = useRef(null);
    

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <RiMessage2Line className="w-8 h-8" />,
            title: "SpringMusk AI",
            description: "Powered by SpringMusk's state-of-the-art language models for human-like conversations.",
            gradient: "from-blue-500 to-purple-500",
            delay: 0
        },
        {
            icon: <RiLightbulbLine className="w-8 h-8" />,
            title: "Contextual Understanding",
            description: "Musker remembers your conversations and provides personalized responses.",
            gradient: "from-purple-500 to-pink-500",
            delay: 0.1
        },
        {
            icon: <FiCpu className="w-8 h-8" />,
            title: "Real-time Processing",
            description: "Lightning-fast responses with SpringMusk's optimized infrastructure.",
            gradient: "from-pink-500 to-red-500",
            delay: 0.2
        },
        {
            icon: <RiShieldLine className="w-8 h-8" />,
            title: "Enterprise Security",
            description: "Your conversations are protected with SpringMusk's security protocols.",
            gradient: "from-red-500 to-orange-500",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/50 to-gray-900 relative">
            {/* Winter Effects */}
            <Snowfall />
            <div className="absolute inset-0 bg-[url('/frost-overlay.png')] opacity-30 pointer-events-none" />
            
            {/* Frost Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />
            
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-blue-500/5' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <RiRobot2Line className="w-8 h-8 text-blue-500" />
                            <span className="ml-2 text-xl font-bold text-white">Musker</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl" />
                </div>

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center relative z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block mb-4"
                        >
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full p-2 backdrop-blur-sm border border-white/10 shadow-lg shadow-blue-500/20">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                                    ❄️ Powered by SpringMusk Technology
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                        >
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Musker</span>,<br />
                            Your AI Companion
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Experience the next generation of AI conversation with Musker, powered by SpringMusk's 
                            cutting-edge technology. Get instant, intelligent responses tailored just for you.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
                        >
                            <Link
                                to="/signup"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_8px_25px_-8px_rgba(147,51,234,0.5)]" />
                                <span className="relative flex items-center">
                                    Start Chatting <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                            
                            <a
                                href="https://github.com/yourusername/chatbot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gray-800 rounded-lg border border-gray-700" />
                                <div className="absolute inset-0 bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center">
                                    <FiGithub className="mr-2" /> GitHub
                                </span>
                            </a>
                        </motion.div>

                        {/* Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="relative mx-auto max-w-5xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl" />
                            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 shadow-[0_0_50px_-12px_rgba(147,51,234,0.25)]">
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-[0_8px_25px_-8px_rgba(147,51,234,0.5)]">
                                    Live Preview
                                </div>
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                </div>
                                <img
                                    src="/chat-preview.png"
                                    alt="AI Chat Interface"
                                    className="rounded-xl shadow-2xl border border-gray-700/50 w-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 rounded-2xl pointer-events-none" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-4 bg-gray-800/30 backdrop-blur-sm overflow-hidden">
                {/* Ice Crystal Background */}
                <div className="absolute inset-0 bg-[url('/ice-pattern.png')] opacity-5" />
                
                {/* Connecting Line with Frost Effect */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                </div>
                
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 relative"
                    >
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 mt-8" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Why Choose Musker
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Built with SpringMusk's advanced AI technology for unparalleled conversation experiences
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" ref={featuresRef}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { 
                                        opacity: 0,
                                        y: 50,
                                        scale: 0.9,
                                        rotateX: -15
                                    },
                                    visible: (i: number) => ({
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        rotateX: 0,
                                        transition: {
                                            delay: i * 0.2,
                                            duration: 0.5,
                                            ease: [0.215, 0.61, 0.355, 1]
                                        }
                                    })
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                custom={index}
                                className="relative group"
                            >
                                {/* Connection dots */}
                                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                                
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                                <div className="relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(147,51,234,0.25)] transform-gpu transition-all duration-300 group-hover:translate-y-[-10px]">
                                    {/* Frost Corner Effect */}
                                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-tl-xl" />
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Ice Crystal Background */}
                <div className="absolute inset-0 bg-[url('/ice-pattern.png')] opacity-5" />
                
                {/* Connecting Line with Frost Effect */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/50 to-transparent blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                </div>
                
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 relative"
                    >
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 mt-8" />
                        <h2 className="text-4xl font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Get started with Musker in three simple steps
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {[
                            {
                                step: "1",
                                title: "Create Account",
                                description: "Sign up for free and set up your profile in seconds",
                                gradient: "from-blue-500 to-purple-500",
                                icon: <FiUser className="w-6 h-6" />
                            },
                            {
                                step: "2",
                                title: "Start Chatting",
                                description: "Begin your conversation with Musker",
                                gradient: "from-purple-500 to-pink-500",
                                icon: <RiMessage2Line className="w-6 h-6" />
                            },
                            {
                                step: "3",
                                title: "Get Results",
                                description: "Receive intelligent responses powered by SpringMusk",
                                gradient: "from-pink-500 to-red-500",
                                icon: <RiLightbulbLine className="w-6 h-6" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { 
                                        opacity: 0,
                                        y: 50,
                                        scale: 0.9,
                                        rotateX: -15
                                    },
                                    visible: (i: number) => ({
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        rotateX: 0,
                                        transition: {
                                            delay: i * 0.3,
                                            duration: 0.5,
                                            ease: [0.215, 0.61, 0.355, 1]
                                        }
                                    })
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                custom={index}
                                className="relative group"
                            >
                                {/* Connection dots */}
                                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                                
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                                <div className="relative overflow-hidden bg-gray-800/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-[0_0_50px_-12px_rgba(147,51,234,0.25)] transform-gpu transition-all duration-300 group-hover:translate-y-[-10px]">
                                    <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-r ${item.gradient} opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity duration-300`} />
                                    <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>
                                    <div className="absolute -top-4 left-4 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/50">
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer with Frost Effect */}
            <footer className="relative bg-gray-800/30 backdrop-blur-sm py-12 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/frost-overlay.png')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/5" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <RiRobot2Line className="w-6 h-6 text-blue-500" />
                                <span className="ml-2 text-lg font-bold text-white">Musker</span>
                            </div>
                            <p className="text-gray-400">
                                Your intelligent companion powered by SpringMusk technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Musker. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
