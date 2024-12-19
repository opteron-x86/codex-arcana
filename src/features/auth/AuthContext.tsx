import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signIn, signOut, signUp } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import type { SignUpInput } from 'aws-amplify/auth';

// types/auth.ts
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  attributes?: {
    email_verified: boolean;
    sub: string;
    [key: string]: any;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (input: SignUpInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    setupAuthListener();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  function setupAuthListener() {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          break;
        case 'signInFailure':
        case 'tokenRefresh_failure':
          setError('Authentication failed. Please try again.');
          break;
      }
    });
  }

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await signIn({ username, password });
      await checkUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (input: SignUpInput) => {
    try {
      setError(null);
      setIsLoading(true);
      await signUp(input);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};