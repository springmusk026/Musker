import React, { useState } from 'react';
import { isToday, isYesterday, isThisWeek, isThisMonth } from 'date-fns';
import { FiPlus, FiChevronLeft, FiChevronRight, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { supabase } from '../supabaseClient';

interface ChatSession {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

interface SidebarProps {
    onSessionSelect: (sessionId: string) => void;
    currentSessionId: string | null;
    sessions: ChatSession[];
    onSessionsUpdate: (sessions: ChatSession[]) => void;
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    onSessionSelect, 
    currentSessionId, 
    sessions,
    onSessionsUpdate,
    isOpen,
    onToggle
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const createNewSession = async () => {
        try {
            setIsLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                console.error('No authenticated user found');
                return;
            }

            const { data: newSession, error } = await supabase
                .from('chat_sessions')
                .insert([
                    {
                        title: 'New Chat',
                        user_id: session.user.id,
                        updated_at: new Date().toISOString()
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            if (newSession) {
                onSessionsUpdate([newSession, ...sessions]);
                onSessionSelect(newSession.id);
            }
        } catch (error) {
            console.error('Error creating session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this chat?')) return;

        try {
            setIsLoading(true);
            
            // First delete all messages associated with this session
            const { error: messagesError } = await supabase
                .from('chat_messages')
                .delete()
                .eq('session_id', sessionId);

            if (messagesError) throw messagesError;

            // Then delete the session
            const { error: sessionError } = await supabase
                .from('chat_sessions')
                .delete()
                .eq('id', sessionId);

            if (sessionError) throw sessionError;
            
            const updatedSessions = sessions.filter(s => s.id !== sessionId);
            onSessionsUpdate(updatedSessions);
            
            if (currentSessionId === sessionId) {
                const nextSession = updatedSessions[0];
                if (nextSession) {
                    onSessionSelect(nextSession.id);
                } else {
                    createNewSession();
                }
            }
        } catch (error) {
            console.error('Error deleting session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const groupSessionsByDate = (sessions: ChatSession[]) => {
        return sessions.reduce((groups, session) => {
            const date = new Date(session.updated_at);
            let group = 'Older';

            if (isToday(date)) group = 'Today';
            else if (isYesterday(date)) group = 'Yesterday';
            else if (isThisWeek(date)) group = 'This Week';
            else if (isThisMonth(date)) group = 'This Month';

            if (!groups[group]) groups[group] = [];
            groups[group].push(session);
            return groups;
        }, {} as Record<string, ChatSession[]>);
    };

    const groupedSessions = groupSessionsByDate(sessions);

    if (isLoading) {
        return (
            <div className="h-screen bg-[#111111] p-4 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <aside className={`h-full bg-[#111111] border-r border-[#2a2a2a] flex flex-col transition-all duration-300 
            ${isOpen ? 'w-64 md:w-72' : 'w-0 md:w-16'} 
            fixed md:relative left-0 z-40
            transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            
            <div className="p-4 flex items-center justify-between border-b border-[#2a2a2a]">
                {isOpen && <h2 className="text-gray-200 font-semibold">Chats</h2>}
                <button
                    onClick={onToggle}
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                    {!isOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>

            {isOpen && <button
                onClick={createNewSession}
                className={`m-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    flex items-center justify-center transition-colors
                    ${!isOpen ? 'mx-2' : 'mx-4'}`}
                disabled={isLoading}
            >
                <FiPlus size={20} />
                {isOpen && <span className="ml-2">New Chat</span>}
            </button>}

            <div className="flex-1 overflow-y-auto">
                {Object.entries(groupedSessions).map(([group, groupSessions]) => (
                    <div key={group} className="mb-4">
                        {isOpen && (
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                                {group}
                            </div>
                        )}
                        {groupSessions.map(session => (
                            <div
                                key={session.id}
                                onClick={() => onSessionSelect(session.id)}
                                className={`flex items-center px-4 py-3 cursor-pointer transition-colors
                                    ${currentSessionId === session.id
                                        ? 'bg-[#2a2a2a] text-white'
                                        : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                                    }`}
                            >
                                {!isOpen ? <FiMessageSquare className="flex-shrink-0" size={16} /> : (
                                    <>
                                        <FiMessageSquare className="flex-shrink-0" size={16} />
                                        <span className="ml-3 flex-1 truncate">{session.title}</span>
                                        <button
                                            onClick={e => deleteSession(session.id, e)}
                                            className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors
                                                hover:bg-red-500/10"
                                            disabled={isLoading}
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
