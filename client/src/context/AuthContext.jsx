import React, { createContext, useContext, useState, useEffect } from 'react';
import * as tokenService from '../services/tokenService.js';
import * as authAPI from '../api/authAPI.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = tokenService.getUser();
    const token = tokenService.getAccessToken();
    
    if (storedUser && token) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (tokens, userData) => {
    const accessToken = tokens?.accessToken || tokens?.access_token;
    const refreshToken = tokens?.refreshToken || tokens?.refresh_token;

    if (!accessToken || !refreshToken || !userData) {
      throw new Error('Invalid login response from server');
    }

    // Save tokens
    tokenService.setTokens(accessToken, refreshToken);
    
    // Save user
    tokenService.setUser(userData);
    
    // Update state
    setUser(userData);
    setIsAuthenticated(true);
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      const nextUser = {
        ...(currentUser || {}),
        ...updates,
      };

      tokenService.setUser(nextUser);
      return nextUser;
    });
  };

  const logout = () => {
    tokenService.clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/auth'; // Redirect to auth page
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.registerUser({ name, email, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await authAPI.loginUser(email, password);
      const payload = response.data || response;
      const { tokens, user, accessToken, refreshToken } = payload;
      login(tokens || { accessToken, refreshToken }, user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data || response);
      return response;
    } catch (error) {
      logout(); // If token is invalid, logout
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    loginUser,
    getCurrentUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
