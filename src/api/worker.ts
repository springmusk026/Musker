import { supabase } from '../supabaseClient';

const WORKER_URL = 'https://divine-lake-993a.springmusk.workers.dev';

interface StreamResponse {
    type: 'connection' | 'message' | 'complete' | 'error';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    error?: string;
}

export type StreamCallback = (event: StreamResponse) => void;

export class WorkerAPI {
    private abortController: AbortController | null = null;

    public cancelRequest() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    public async streamMessage(message: string, onEvent: StreamCallback): Promise<void> {
        this.cancelRequest();
        this.abortController = new AbortController();

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.access_token) {
                throw new Error('No authenticated session');
            }

            const response = await fetch(`${WORKER_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ message }),
                signal: this.abortController.signal,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            onEvent({ type: 'connection', data: { status: 'connected' } });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let buffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (line.trim() === 'data: [DONE]') {
                        onEvent({ type: 'complete' });
                        continue;
                    }

                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            // Clean up response content
                            if (data.response !== undefined) {
                                let content = data.response;
                                // Fix potential code block issues
                                if (content.includes('```')) {
                                    content = content.replace(/```(\w+)?(\s*\n)?/g, '```$1\n');
                                }
                                onEvent({
                                    type: 'message',
                                    data: { content }
                                });
                            }
                        } catch (error) {
                            console.error('Error processing stream data:', error);
                        }
                    }
                }
            }

            // Process any remaining data in the buffer
            if (buffer.trim() && !buffer.includes('[DONE]')) {
                try {
                    const data = JSON.parse(buffer.trim().slice(6));
                    if (data.response !== undefined) {
                        let content = data.response;
                        // Fix potential code block issues
                        if (content.includes('```')) {
                            content = content.replace(/```(\w+)?(\s*\n)?/g, '```$1\n');
                        }
                        onEvent({
                            type: 'message',
                            data: { content }
                        });
                    }
                } catch (error) {
                    console.error('Error processing final stream data:', error);
                }
            }

        } catch (error) {

            onEvent({
                type: 'error',
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        } finally {
            this.abortController = null;
        }
    }

    public async streamImage(prompt: string, onEvent: StreamCallback): Promise<void> {
        this.cancelRequest();
        this.abortController = new AbortController();

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.access_token) {
                throw new Error('No authenticated session');
            }

            const response = await fetch(`${WORKER_URL}/api/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ prompt }),
                signal: this.abortController.signal,
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            onEvent({ type: 'connection', data: { status: 'connected' } });

            const reader = response.body.getReader();
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (value) chunks.push(value);
            }

            const blob = new Blob(chunks, { type: 'image/jpg' });
            const imageUrl = URL.createObjectURL(blob);

            onEvent({
                type: 'message',
                data: { imageUrl },
            });

            onEvent({ type: 'complete' });
        } catch (error) {

            onEvent({
                type: 'error',
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        } finally {
            this.abortController = null;
        }
    }

}
