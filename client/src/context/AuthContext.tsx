import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.me()
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authService.login({ email, password });
        console.log(res.data)
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
    };

    const register = async (username: string, email: string, password: string) => {
        const res = await authService.register({ username, email, password });
        setUser(res.data.user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
