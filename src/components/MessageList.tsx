import React from 'react';
import { Message } from '../types/chat';
import { MessageContent } from './MessageContent';
import { RiRobot2Line } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';

interface MessageListProps {
    messages: Message[];
    onImageClick: (url: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, onImageClick }) => {
    return (
        <div className="space-y-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${
                        message.role === 'assistant' ? 'bg-[#111111] rounded-xl p-4 shadow-lg' : ''
                    }`}
                >
                    <div className={`flex-shrink-0 ${
                        message.role === 'assistant' 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                            : 'bg-gradient-to-br from-gray-700 to-gray-600'
                        } rounded-full p-2`}
                    >
                        {message.role === 'assistant' ? (
                            <RiRobot2Line className="w-5 h-5 text-white" />
                        ) : (
                            <FiUser className="w-5 h-5 text-white" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-500 mb-1">
                            {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                        </div>
                        <div className={`prose prose-invert max-w-none ${
                            message.role === 'user' ? 'text-gray-300' : 'text-gray-200'
                        }`}>
                            <MessageContent 
                                content={message.content} 
                                imageUrl={message.imageUrl} 
                                onImageClick={onImageClick} 
                                isAssistant={message.role === 'assistant'}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
