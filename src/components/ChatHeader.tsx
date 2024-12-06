import React, { useState } from 'react';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

export const ChatHeader: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="bg-[#111111] border-b border-[#2a2a2a] px-4 sm:px-6 py-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <RiRobot2Line className="w-8 h-8 text-blue-500 animate-pulse" />
                        <div>
                            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Musker
                            </h1>
                            <p className="text-sm text-gray-500 hidden sm:block">Powered by Spring Musk</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:block">
                            <FiGithub className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden text-gray-500 hover:text-gray-300 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-[#111111] border-b border-[#2a2a2a]">
                    <div className="px-4 py-3 space-y-2">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                           className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors">
                            <FiGithub className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};
