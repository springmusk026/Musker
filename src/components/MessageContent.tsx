import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy } from 'react-icons/fi';

interface MessageContentProps {
    content: string;
    imageUrl?: string;
    onImageClick?: (url: string) => void;
    isAssistant?: boolean;
}

export const MessageContent: React.FC<MessageContentProps> = ({ content, imageUrl, onImageClick, isAssistant }) => {
    const safeContent = content || '';

    const processedContent = useMemo(() => {
        let processed = safeContent;

        // Normalize code blocks to ensure proper parsing
        processed = processed.replace(/```\s*(\w*)\s*\n([\s\S]*?)```/g, (_, lang, code) => {
            const language = lang.trim() || 'text';
            const trimmedCode = code.trim();
            return `\`\`\`${language}\n${trimmedCode}\n\`\`\``;
        });

        // Count the number of ``` occurrences to ensure balanced code blocks
        const codeBlockCount = (processed.match(/```/g) || []).length;

        // Append an ending ``` if unbalanced
        if (codeBlockCount % 2 !== 0) {
            processed += '\n```';
        }

        return processed.trim();
    }, [safeContent]);

    const handleImageClick = () => {
        if (imageUrl && onImageClick) {
            onImageClick(imageUrl);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!');
    };

    return (
        <div className={`prose prose-invert max-w-none ${isAssistant ? 'relative w-full' : ''}`}>
            {isAssistant && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-300 focus:outline-none"
                    title="Copy to clipboard"
                >
                    <FiCopy className="w-5 h-5" />
                </button>
            )}
            {content && (
                <ReactMarkdown
                    className={`${isAssistant ? 'w-full break-words whitespace-pre-wrap' : ''}`}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';
                            const codeString = String(children).replace(/\n$/, '');

                            if (inline) {
                                return (
                                    <code className="bg-gray-800 rounded px-1 py-0.5" {...props}>
                                        {codeString}
                                    </code>
                                );
                            }

                            return (
                                <div className="relative group my-4">
                                    <div
                                        className="absolute -top-3 right-2 px-2 py-1 text-xs 
                                                  text-gray-400 bg-gray-800 rounded-md opacity-0 
                                                  group-hover:opacity-100 transition-opacity"
                                    >
                                        {language || 'text'}
                                    </div>
                                    <div className="relative">
                                        <SyntaxHighlighter
                                            language={language || 'text'}
                                            //
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            style={atomDark as any}
                                            customStyle={{
                                                margin: 0,
                                                borderRadius: '0.5rem',
                                                background: 'rgba(17, 24, 39, 0.8)',
                                            }}
                                            {...props}
                                        >
                                            {codeString}
                                        </SyntaxHighlighter>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(codeString)}
                                            className="absolute top-2 right-2 p-1 rounded-md
                                                     bg-gray-700 text-gray-300 opacity-0
                                                     group-hover:opacity-100 hover:bg-gray-600
                                                     transition-all duration-200"
                                            title="Copy code"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        },
                        p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>;
                        },
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            )}
            {imageUrl && (
                <div className="mt-4">
                    <img
                        src={imageUrl}
                        alt="Generated"
                        className="cursor-pointer w-32 h-32 object-cover rounded-lg hover:opacity-75 transition-opacity"
                        onClick={handleImageClick}
                    />
                </div>
            )}
        </div>
    );
};
