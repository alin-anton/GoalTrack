import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/User'; // Folosim tipul tău deja creat

// Definim ce informații și funcții va conține contextul nostru global
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Creăm contextul (inițial este undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider-ul este componenta care va "înveli" aplicația și va oferi datele
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // La fiecare refresh, verificăm dacă avem deja un token și date salvate în memoria browserului
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Funcția de login: salvează token-ul și utilizatorul atât în state (memoria RAM), cât și în localStorage (pe disc)
  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Funcția de logout: șterge tot pentru a închide sesiunea
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Opțional: Forțăm un refresh sau redirect către login
    window.location.href = '/login';
  };

  // Variabilă utilitară care ne spune rapid dacă suntem logați sau nu
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizat pentru a folosi contextul ușor în orice componentă
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  return context;
};