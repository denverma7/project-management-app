import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      throw err;
    }
  };
// Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Check if the user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      api.get('/auth/me')
        .then((response) => setUser(response.data.user))
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          logout();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);