export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    type?: 'text' | 'code';
    language?: string;
    imageUrl?: string;
  }

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}