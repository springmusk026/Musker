import React from 'react';
import { RiRobot2Line, RiLightbulbLine, RiCodeLine, RiQuestionLine } from 'react-icons/ri';

interface WelcomeScreenProps {
    onSuggestionClick: (text: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
    const suggestions = [
        { icon: <RiLightbulbLine />, text: "Explain React hooks" },
        { icon: <RiCodeLine />, text: "Write a binary search in Python" },
        { icon: <RiLightbulbLine />, text: "Explain JavaScript closures" },
        { icon: <RiQuestionLine />, text: "What are TypeScript generics?" }
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
            <RiRobot2Line className="w-16 h-16 text-gray-700 animate-bounce" />
            <div>
                <h2 className="text-xl font-semibold text-gray-400 mb-2">Welcome to Musker!</h2>
                <p className="text-gray-600 max-w-md mb-8">
                    I'm here to help you with coding, answering questions, and more. 
                    Feel free to start a conversation!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => onSuggestionClick(suggestion.text)}
                            className="flex items-center space-x-2 p-4 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
                                     border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all
                                     text-left group shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Suggestion: ${suggestion.text}`}
                        >
                            <span className="text-gray-500 group-hover:text-blue-400 transition-colors">
                                {suggestion.icon}
                            </span>
                            <span className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
                                {suggestion.text}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
