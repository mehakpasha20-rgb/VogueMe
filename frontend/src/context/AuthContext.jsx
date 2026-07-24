/**
 * Authentication Context
 * 
 * Creates and provides React Context for managing user authentication state globally.
 * Handles automatic token verification upon page reload, login/signup API communication,
 * session token storage in localStorage, and logout clearing.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

// Create a React Context object for authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State to hold the current logged-in user object
  const [user, setUser] = useState(null);
  
  // State to track if the application is currently checking for an existing session token
  const [loading, setLoading] = useState(true);

  // Run on mount to check if user has an active login token stored in local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches the user profile from the backend using the stored JWT token.
   * If token is invalid or request fails, token is removed.
   */
  const fetchUser = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Remove stale/invalid token
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  /**
   * authenticates a user credentials with the backend, stores token, and updates user state
   */
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  /**
   * registers a new user with the backend, stores token, and updates user state
   */
  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  };

  /**
   * Logs out the user by clearing user state and deleting JWT token from local storage
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    // Supply user, authentication methods, and loading state to children components
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to quickly access Auth Context inside component functions
export const useAuth = () => useContext(AuthContext);

