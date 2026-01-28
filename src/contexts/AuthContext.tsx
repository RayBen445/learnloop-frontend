'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, User } from '../app/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  mounted: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Hydration guard: only access localStorage after component mounts
  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Only check auth on client-side after mount
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('learnloop_token');
    
    if (token) {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        // Token is invalid or expired, clear it
        localStorage.removeItem('learnloop_token');
        setUser(null);
      }
    }
    
    setLoading(false);
  };

  const login = async (token: string) => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learnloop_token', token);
    }
    await checkAuth();
  };

  const logout = () => {
    setLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('learnloop_token');
    }
    setUser(null);
    setLoading(false);
  };

  const refreshUser = async () => {
    setLoading(true);
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loading, mounted, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
