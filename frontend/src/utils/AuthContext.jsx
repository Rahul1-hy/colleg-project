import React, { createContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    // Check localStorage or other storage for existing auth state
    const token = localStorage.getItem('authToken');
    return token ? { token } : null;
  });

  const logout = useCallback(() => {
    setAuthState(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/verify-token/', {
          headers: { 'Authorization': `Bearer ${authState?.token}` }
        });

        if (response.ok) {
          const data = await response.json();
          // Handle valid token
          console.log('Token is valid:', data);
        } else {
          // Handle invalid token
          logout();
        }
      } catch (error) {
        // Handle fetch error
        logout();
      }
    };

    if (authState?.token) {
      verifyToken();
    }
  }, [authState?.token, logout]);

  const login = (token) => {
    setAuthState({ token });
    localStorage.setItem('authToken', token); // Store token in localStorage
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
