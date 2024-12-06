import React from 'react';
import { Message } from './../types/chat';
import { MessageContent } from './MessageContent';

interface MessageItemProps {
    message: Message;
    isStreaming?: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isStreaming }) => {
    const isAI = message.role === 'assistant';

    return (
        <div className="py-8 first:pt-4 last:pb-4">
            <div className="max-w-4xl mx-auto px-4">
                <div className={`
                    rounded-lg px-4 py-3
                    ${isAI ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-blue-600/50 backdrop-blur-sm'}
                    ${isStreaming ? 'animate-pulse' : ''}
                `}>
                    <MessageContent content={message.content}  />
                </div>
            </div>
        </div>
    );
};
