import { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkerAPI, StreamCallback } from '../api/worker';
import { supabase } from '../supabaseClient';

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    imageUrl?: string;
}

export const useChat = (currentSessionId: string | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [popupImageUrl, setPopupImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const workerApi = useRef(new WorkerAPI());
    const currentResponseRef = useRef<string>('');
    const userMessageRef = useRef<Message | null>(null);

    // Load messages when session changes
    useEffect(() => {
        let mounted = true;

        const loadMessages = async () => {
            if (!currentSessionId) {
                setMessages([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const { data: { session } } = await supabase.auth.getSession();
                
                if (!session?.user || !mounted) {
                    setIsLoading(false);
                    return;
                }

                const { data: messages, error } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('session_id', currentSessionId)
                    .order('timestamp', { ascending: true });

                if (error) {
                    console.error('Error loading messages:', error);
                    throw error;
                }

                if (messages && mounted) {
                    setMessages(messages.map(msg => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    })));
                }
            } catch (error) {
                console.error('Error loading messages:', error);
                setMessages([]);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadMessages();
        return () => {
            mounted = false;
        };
    }, [currentSessionId]);

    // Save messages to Supabase
    const saveMessages = async (userMessage: Message, assistantMessage: Message) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user || !currentSessionId) {
                console.error('No authenticated user or session found');
                return;
            }

            // Save the messages
            const { error } = await supabase
                .from('chat_messages')
                .insert([
                    {
                        ...userMessage,
                        user_id: session.user.id,
                        session_id: currentSessionId
                    },
                    {
                        ...assistantMessage,
                        user_id: session.user.id,
                        session_id: currentSessionId
                    }
                ]);

            if (error) {
                console.error('Error saving messages:', error);
                return;
            }

            // Update session's updated_at timestamp
            const { error: updateError } = await supabase
                .from('chat_sessions')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', currentSessionId)
                .eq('user_id', session.user.id);

            if (updateError) {
                console.error('Error updating session:', updateError);
            }
        } catch (error) {
            console.error('Error in saveMessages:', error);
        }
    };

    // Clean up worker on unmount
    useEffect(() => {
        return () => {
            workerApi.current.cancelRequest();
        };
    }, []);

    const handleStreamEvent: StreamCallback = useCallback((event) => {
        switch (event.type) {
            case 'connection':
                console.log('Connected to stream');
                break;

            case 'message':
                if (event.data?.content) {
                    currentResponseRef.current += event.data.content;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'assistant') {
                            lastMessage.content = currentResponseRef.current;
                        }
                        return newMessages;
                    });
                } else if (event.data?.imageUrl) {
                    const assistantMessage: Message = {
                        id: uuidv4(),
                        content: '',
                        role: 'assistant',
                        timestamp: new Date(),
                        imageUrl: event.data.imageUrl
                    };
                    if (userMessageRef.current) {
                        saveMessages(userMessageRef.current, assistantMessage);
                        userMessageRef.current = null;
                    }
                    setMessages(prev => [...prev, assistantMessage]);
                    setPopupImageUrl(event.data.imageUrl);
                }
                break;

            case 'complete':
                setIsStreaming(false);
                break;

            case 'error':
                console.error('Stream error:', event.error);
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                        lastMessage.content = 'Sorry, there was an error processing your message.';
                    }
                    return newMessages;
                });
                setIsStreaming(false);
                break;
        }
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: uuidv4(),
            content: inputMessage,
            role: 'user',
            timestamp: new Date()
        };

        const assistantMessage: Message = {
            id: uuidv4(),
            content: '',
            role: 'assistant',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
        setInputMessage('');
        userMessageRef.current = userMessage;
        currentResponseRef.current = '';

        try {
            setIsStreaming(true);
            await workerApi.current.streamMessage(inputMessage, handleStreamEvent);
            
            // After streaming is complete, save both messages
            if (userMessageRef.current) {
                const finalAssistantMessage: Message = {
                    id: assistantMessage.id,
                    content: currentResponseRef.current,
                    role: 'assistant',
                    timestamp: new Date()
                };
                await saveMessages(userMessageRef.current, finalAssistantMessage);
                userMessageRef.current = null;
            }
        } catch (error) {
            console.error('Error in chat:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                    lastMessage.content = 'Sorry, there was an error processing your message.';
                }
                return newMessages;
            });
        } finally {
            setIsStreaming(false);
        }
    };

    const handleImageGeneration = async () => {
        if (!inputMessage.trim() || isStreaming) return;

        const prompt = inputMessage;
        setInputMessage('');
        setIsStreaming(true);

        try {
            await workerApi.current.streamImage(prompt, handleStreamEvent);
        } catch (error) {
            console.error('Failed to generate image:', error);
            setIsStreaming(false);
            // Save messages with error state if needed
            if (userMessageRef.current) {
                const errorMessage: Message = {
                    id: uuidv4(),
                    content: 'Error: Failed to generate image',
                    role: 'assistant',
                    timestamp: new Date()
                };
                saveMessages(userMessageRef.current, errorMessage);
                userMessageRef.current = null;
            }
        }
    };

    return {
        messages,
        inputMessage,
        setInputMessage,
        handleSubmit,
        isStreaming,
        popupImageUrl,
        setPopupImageUrl,
        handleImageGeneration,
        isLoading
    };
};
