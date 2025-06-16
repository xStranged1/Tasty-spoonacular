import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { saveItem, getItem, deleteItem } from '../data/secureStore';

interface AuthContextData {
    token: string | null;
    loading: boolean;
    signIn: (newToken: string) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
    token: null,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const stored = await getItem('userToken');
            if (stored) setToken(stored);
            setLoading(false);
        })();
    }, []);

    const signIn = async (newToken: string) => {
        setToken(newToken);
        await saveItem('userToken', newToken);
    };

    const signOut = async () => {
        setToken(null);
        await deleteItem('userToken');
    };

    return (
        <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};