
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'learner';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'admin' | 'learner') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API response
      const userData: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 'learner',
        name: email.split('@')[0]
      };
      
      const token = 'mock-jwt-token';
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'admin' | 'learner') => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        role,
        name
      };
      
      const token = 'mock-jwt-token';
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
