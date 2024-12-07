import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface BanError {
    code: 'user_banned';
    message: string;
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [banError, setBanError] = useState<BanError | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First try to get current session
                const { data: { session } } = await supabase.auth.getSession();
                
                if (session) {
                    // If we have a session, try to refresh it to check ban status
                    const { error: refreshError } = await supabase.auth.refreshSession();
                    if (refreshError) {
                        if (refreshError.message === 'User is banned') {
                            setBanError({
                                code: 'user_banned',
                                message: refreshError.message
                            });
                            setAuthenticated(false);
                            await supabase.auth.signOut();
                        } else {
                            console.error('Auth error:', refreshError);
                            setAuthenticated(false);
                        }
                    } else {
                        setAuthenticated(true);
                        setBanError(null);
                    }
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Error in checkAuth:', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                setAuthenticated(true);
                setBanError(null);
            } else if (event === 'SIGNED_OUT') {
                setAuthenticated(false);
                setBanError(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!authenticated) {
        if (banError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                    <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Account Suspended</h2>
                        <p className="text-gray-300 mb-6">
                            {banError.message}
                        </p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Return to Login
                        </button>
                    </div>
                </div>
            );
        }
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
