import { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkerAPI, StreamCallback } from '../api/worker';
import { Message } from '../types/chat';

const CHAT_STORAGE_KEY = 'chat_messages';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [popupImageUrl, setPopupImageUrl] = useState<string | null>(null);
    
    const workerApi = useRef(new WorkerAPI());
    const currentResponseRef = useRef<string>('');

    useEffect(() => {
        // Load messages from localStorage on mount
        const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        // Save messages to localStorage whenever they change
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

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
                    setMessages(prev => [
                        ...prev,
                        {
                            id: uuidv4(),
                            content: '',
                            role: 'assistant',
                            timestamp: new Date(),
                            imageUrl: event.data.imageUrl
                        }
                    ]);
                    setPopupImageUrl(event.data.imageUrl);
                }
                break;

            case 'complete':
                setIsStreaming(false);
                currentResponseRef.current = '';
                break;

            case 'error':
                console.error('Stream error:', event.error);
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                        lastMessage.content += '\n\nError: ' + (event.error || 'Failed to get complete response.');
                    }
                    return newMessages;
                });
                setIsStreaming(false);
                currentResponseRef.current = '';
                break;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage || isStreaming) return;

        workerApi.current.cancelRequest();
        currentResponseRef.current = '';

        setMessages(prev => [
            ...prev,
            {
                id: uuidv4(),
                content: trimmedMessage,
                role: 'user',
                timestamp: new Date(),
            },
            {
                id: uuidv4(),
                content: '',
                role: 'assistant',
                timestamp: new Date(),
            }
        ]);

        setInputMessage('');
        setIsStreaming(true);

        try {
            await workerApi.current.streamMessage(trimmedMessage, handleStreamEvent);
        } catch (error) {
            console.error('Failed to send message:', error);
            setIsStreaming(false);
        }
    };

    const handleImageGeneration = async () => {
        const trimmedPrompt = inputMessage.trim();
        if (!trimmedPrompt || isStreaming) return;

        workerApi.current.cancelRequest();

        setMessages(prev => [
            ...prev,
            {
                id: uuidv4(),
                content: trimmedPrompt,
                role: 'user',
                timestamp: new Date(),
            },
            {
                id: uuidv4(),
                content: `Generating image. ..`,
                role: 'assistant',
                timestamp: new Date(),
            }
        ]);

        setInputMessage('');
        setIsStreaming(true);

        try {
            await workerApi.current.streamImage(trimmedPrompt, handleStreamEvent);
        } catch (error) {
            console.error('Failed to generate image:', error);
            setIsStreaming(false);
        }
    };

    return {
        messages,
        inputMessage,
        setInputMessage,
        isStreaming,
        popupImageUrl,
        setPopupImageUrl,
        handleSubmit,
        handleImageGeneration
    };
};
