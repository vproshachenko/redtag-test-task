import React, { createContext, useContext, useState } from 'react';
import { checkAuthSession, logout, login } from '../api/auth';

interface AuthContextType {
    isLoggedIn: boolean;
    handleLogin: (email: string, password: string) => Promise<boolean>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => checkAuthSession());

    const handleLogin = async (email: string, password: string) => {
        const success = await login(email, password);
        if (success) setIsLoggedIn(true);
        return success;
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};