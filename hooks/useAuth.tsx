import React, { useState, useEffect, useContext, createContext } from 'react';
// FIX: Import firebase to use firebase types and services.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase';

interface AuthContextType {
    user: firebase.User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => {},
    signOut: async () => {},
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    
    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};