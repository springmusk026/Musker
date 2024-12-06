import React, { useRef, useEffect } from 'react';
import { MessageList } from './components/MessageList';
import { ImagePopup } from './components/ImagePopup';
import { ChatInput } from './components/ChatInput';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatHeader } from './components/ChatHeader';
import { useChat } from './hooks/useChat';

export const ChatInterface: React.FC = () => {
    const {
        messages,
        inputMessage,
        setInputMessage,
        isStreaming,
        popupImageUrl,
        setPopupImageUrl,
        handleSubmit,
        handleImageGeneration
    } = useChat();

    const messageEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen relative bg-[#111111]">
            <div className="absolute inset-0 pointer-events-none">
                {/* {<ParticleBackground />} */}
            </div>
            <ChatHeader />
            <div className="flex-1 overflow-hidden relative">
                <div className="flex-1 overflow-hidden h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 
                                scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#111111]">
                        <div className="max-w-4xl mx-auto w-full space-y-6">
                            {messages.length === 0 ? (
                                <WelcomeScreen onSuggestionClick={setInputMessage} />
                            ) : (
                                <MessageList messages={messages} onImageClick={(url) => setPopupImageUrl(url)} />
                            )}
                            <div ref={messageEndRef} />
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full max-w-4xl mx-auto px-2 sm:px-4 lg:px-8 pb-4 border-t border-[#2a2a2a] bg-[#111111]">
                        <ChatInput
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            isStreaming={isStreaming}
                            onSubmit={handleSubmit}
                            onImageGeneration={handleImageGeneration}
                        />
                    </div>
                </div>
            </div>

            {/* Image Popup */}
            {popupImageUrl && (
                <ImagePopup imageUrl={popupImageUrl} onClose={() => setPopupImageUrl(null)} />
            )}

            {/* Loading Indicator */}
            {isStreaming && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#1a1a1a] text-blue-400 px-4 py-2 rounded-full 
                                  border border-[#2a2a2a] shadow-lg">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
                            <span>AI is thinking...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
