import React, { useRef, useEffect } from 'react';
import { FiSend, FiCommand, FiImage } from 'react-icons/fi';

interface ChatInputProps {
    inputMessage: string;
    setInputMessage: (message: string) => void;
    isStreaming: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onImageGeneration: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputMessage,
    setInputMessage,
    isStreaming,
    onSubmit,
    onImageGeneration
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '50px';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputMessage]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Create a proper form event
            const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent;
            onSubmit(formEvent);
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-4xl mx-auto relative">
            <div className="relative flex items-end">
                <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="w-full bg-[#1a1a1a] text-gray-200 rounded-xl pl-4 pr-16 py-3 
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                             placeholder-gray-600 resize-none min-h-[50px] max-h-[200px]
                             border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg"
                    disabled={isStreaming}
                    rows={1}
                    aria-label="Message input"
                />
                <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-600 bg-[#0a0a0a] 
                                 rounded border border-[#2a2a2a] shadow">
                        <FiCommand className="inline w-3 h-3 mr-1" />
                        Enter
                    </kbd>
                    <button
                        type="button"
                        onClick={onImageGeneration}
                        disabled={!inputMessage.trim() || isStreaming}
                        className="p-2 text-gray-400 hover:text-green-400
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200 rounded-lg
                                 hover:bg-green-500/10 focus:outline-none focus:ring-2 
                                 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                        aria-label="Generate image"
                    >
                        <FiImage className={`w-5 h-5 ${isStreaming ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        type="submit"
                        disabled={!inputMessage.trim() || isStreaming}
                        className="p-2 text-gray-400 hover:text-blue-400
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all duration-200 rounded-lg
                                 hover:bg-blue-500/10 focus:outline-none focus:ring-2 
                                 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                        aria-label="Send message"
                    >
                        <FiSend className={`w-5 h-5 ${isStreaming ? 'animate-pulse' : ''}`} />
                    </button>
                </div>
            </div>
        </form>
    );
};
