import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiRobot2Line, RiMessage2Line, RiLightbulbLine, RiShieldLine } from 'react-icons/ri';
import { FiArrowRight, FiCpu, FiGithub, FiUser } from 'react-icons/fi';
import { SEO } from './SEO';
import '../styles/HomePage.css';

const HomePage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            title: "SpringMusk AI",
            description: "Advanced conversation capabilities powered by cutting-edge AI technology",
            gradient: "from-blue-500 to-purple-500",
            icon: <FiCpu className="w-6 h-6" />
        },
        {
            title: "Contextual Understanding",
            description: "Natural language processing that understands context and nuance",
            gradient: "from-purple-500 to-pink-500",
            icon: <RiMessage2Line className="w-6 h-6" />
        },
        {
            title: "Real-time Processing",
            description: "Lightning-fast responses with optimized infrastructure",
            gradient: "from-pink-500 to-red-500",
            icon: <RiLightbulbLine className="w-6 h-6" />
        },
        {
            title: "Enterprise Security",
            description: "Bank-grade encryption to protect your conversations",
            gradient: "from-red-500 to-orange-500",
            icon: <RiShieldLine className="w-6 h-6" />
        }
    ];

    const stats = [
        { number: "10M+", label: "Messages Processed" },
        { number: "99.9%", label: "Uptime" },
        { number: "150+", label: "Countries Served" },
        { number: "4.9/5", label: "User Rating" }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            content: "Musker has transformed how we handle customer inquiries. The AI's understanding is remarkable.",
            image: "/testimonials/sarah.jpg"
        },
        {
            name: "David Chen",
            role: "Software Developer",
            content: "As a developer, I'm impressed by Musker's API integration and real-time capabilities.",
            image: "/testimonials/david.jpg"
        },
        {
            name: "Emma Williams",
            role: "Content Creator",
            content: "Musker helps me brainstorm ideas and refine my content. It's like having a creative partner.",
            image: "/testimonials/emma.jpg"
        }
    ];

    const howItWorks = [
        {
            title: "Sign Up",
            description: "Create your account in seconds and get immediate access to Musker's capabilities",
            icon: <FiUser className="w-6 h-6" />
        },
        {
            title: "Start Chatting",
            description: "Begin your conversation with Musker and experience AI-powered responses",
            icon: <RiMessage2Line className="w-6 h-6" />
        },
        {
            title: "Get Results",
            description: "Receive intelligent, context-aware responses tailored to your needs",
            icon: <RiLightbulbLine className="w-6 h-6" />
        }
    ];

    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            features: [
                "100 messages per month",
                "Basic AI responses",
                "Community support",
                "Standard response time"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$19",
            features: [
                "Unlimited messages",
                "Advanced AI capabilities",
                "Priority support",
                "Faster response time",
                "Custom AI training"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: [
                "Everything in Pro",
                "Dedicated support",
                "Custom integration",
                "SLA guarantee",
                "Advanced analytics"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <>
            <SEO 
                title="Musker - Your AI Companion"
                description="Experience the next generation of AI conversation with Musker, powered by SpringMusk technology. Engage in natural, context-aware discussions with advanced AI."
                keywords="AI chatbot, SpringMusk, artificial intelligence, conversational AI, natural language processing"
                ogImage="/og-image.png"
            />
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/50 to-gray-900 relative">
                
                {/* Navigation */}
                <nav className={`fixed w-full z-50 nav-scroll ${isScrolled ? 'scrolled' : ''}`}>
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
                                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center relative z-10">
                            <div className="scale-in mb-4">
                                <div className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full p-2 backdrop-blur-sm border border-white/10">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                                        ❄️ Powered by SpringMusk Technology
                                    </div>
                                </div>
                            </div>
                            
                            <h1 className="slide-up text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Musker</span>,<br />
                                Your AI Companion
                            </h1>
                            
                            <p className="slide-up text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Experience the next generation of AI conversation with Musker, powered by SpringMusk's 
                                cutting-edge technology. Get instant, intelligent responses tailored just for you.
                            </p>
                            
                            <div className="slide-up flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                                <Link to="/signup" className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center">
                                        Start Chatting <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </Link>
                                
                                <a href="https://github.com/yourusername/chatbot" target="_blank" rel="noopener noreferrer" 
                                   className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300">
                                    <div className="absolute inset-0 bg-gray-800 rounded-lg border border-gray-700" />
                                    <div className="absolute inset-0 bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className="relative flex items-center">
                                        <FiGithub className="mr-2" /> GitHub
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-20 px-4 bg-gray-800/30 backdrop-blur-sm" ref={featuresRef}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Why Choose Musker
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Built with SpringMusk's advanced AI technology for unparalleled conversation experiences
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card bg-gray-800/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
                                    <div className={`feature-icon w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="feature-title text-2xl font-semibold text-white mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="relative py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="relative py-20 px-4 bg-gray-800/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Get started with Musker in three simple steps
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {howItWorks.map((step, index) => (
                                <div key={index} className="text-center p-6">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-400">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                What Our Users Say
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Join thousands of satisfied users who trust Musker for their AI needs
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
                                    <div className="flex items-center mb-6">
                                        <img 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">{testimonial.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="relative py-20 px-4 bg-gray-800/30 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Choose the plan that best fits your needs
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`relative bg-gray-800/40 backdrop-blur-xl p-8 rounded-xl border ${plan.popular ? 'border-blue-500' : 'border-white/10'}`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-gray-300">
                                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                                        className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                                            plan.popular
                                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                                        }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Experience the Future of AI?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Join thousands of users who are already transforming their work with Musker
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                to="/signup"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative flex items-center">
                                    Get Started Free <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                            <Link
                                to="/contact"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gray-800 rounded-lg border border-gray-700" />
                                <div className="absolute inset-0 bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative">Contact Sales</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative bg-gray-800/30 backdrop-blur-sm py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center mb-4">
                                    <RiRobot2Line className="w-6 h-6 text-blue-500" />
                                    <span className="ml-2 text-lg font-bold text-white">Musker</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Your intelligent companion powered by SpringMusk technology.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <FiGithub className="w-5 h-5" />
                                    </a>
                                    {/* Add more social media icons as needed */}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Product</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                                    <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                                    <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
                                    <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Company</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                                    <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                                    <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                                    <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Legal</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                    <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                                    <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                            <p className="text-gray-400">
                                {new Date().getFullYear()} Musker. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomePage;
