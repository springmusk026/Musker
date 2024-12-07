import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageList } from './components/MessageList';
import { ImagePopup } from './components/ImagePopup';
import { ChatInput } from './components/ChatInput';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatHeader } from './components/ChatHeader';
import { useChat } from './hooks/useChat';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';

interface ChatSession {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

const ChatInterface: React.FC = () => {
    const navigate = useNavigate();
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { 
        messages, 
        inputMessage, 
        setInputMessage, 
        handleSubmit, 
        isStreaming, 
        popupImageUrl, 
        setPopupImageUrl, 
        handleImageGeneration,
        isLoading: isChatLoading 
    } = useChat(currentSessionId);

    useEffect(() => {
        checkAuth();
        loadSessions();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login');
        }
    };

    const loadSessions = async () => {
        try {
            setIsLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate('/login');
                return;
            }

            const { data: sessions, error } = await supabase
                .from('chat_sessions')
                .select('*')
                .eq('user_id', session.user.id)
                .order('updated_at', { ascending: false });

            if (error) throw error;
            
            setSessions(sessions || []);
            
            // Set initial session
            if (sessions && sessions.length > 0) {
                setCurrentSessionId(sessions[0].id);
            } else {
                // Create a new session if none exists
                const { data: newSession } = await supabase
                    .from('chat_sessions')
                    .insert([{ 
                        title: 'New Chat',
                        user_id: session.user.id
                    }])
                    .select()
                    .single();

                if (newSession) {
                    setSessions([newSession]);
                    setCurrentSessionId(newSession.id);
                }
            }
        } catch (error) {
            console.error('Error loading initial sessions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSessionSelect = async (sessionId: string) => {
        setCurrentSessionId(sessionId);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentSessionId) {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user) {
                    console.error('No authenticated user found');
                    return;
                }

                // Create a new session if none exists
                const { data: newSession, error } = await supabase
                    .from('chat_sessions')
                    .insert([{
                        title: inputMessage.slice(0, 50),
                        user_id: session.user.id,
                        updated_at: new Date().toISOString()
                    }])
                    .select()
                    .single();

                if (error) {
                    console.error('Error creating session:', error);
                    return;
                }

                if (newSession) {
                    setCurrentSessionId(newSession.id);
                    setSessions(prev => [newSession, ...prev]);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                return;
            }
        }

        handleSubmit(e);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#111111]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#111111] flex flex-col">
            {/* Header */}
            <ChatHeader />

            {/* Main Content */}
            <div className="flex-1 flex relative">
                <Sidebar
                    onSessionSelect={handleSessionSelect}
                    currentSessionId={currentSessionId}
                    sessions={sessions}
                    onSessionsUpdate={setSessions}
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4">
                        {isChatLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <WelcomeScreen onSuggestionClick={setInputMessage} />
                        ) : (
                            <MessageList messages={messages} onImageClick={(url) => setPopupImageUrl(url)} />
                        )}
                    </div>

                    <div className="p-4 border-t border-[#2a2a2a]">
                        <ChatInput
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            isStreaming={isStreaming}
                            onSubmit={handleSendMessage}
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

export { ChatInterface };
