import React, { useState } from 'react';
import { FiGithub, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const ChatHeader: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

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
                        <Link
                            to="/profile"
                            className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:flex items-center space-x-1"
                        >
                            <FiUser className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:flex items-center space-x-1"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:block"
                        >
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
                    <div className="px-4 py-2 space-y-2">
                        <Link
                            to="/profile"
                            className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FiUser className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors py-2 w-full text-left"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <FiGithub className="w-5 h-5" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};
