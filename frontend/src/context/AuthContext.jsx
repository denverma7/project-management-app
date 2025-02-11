// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../api/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const response = await api.post('/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       setUser(response.data.user);
//     } catch (err) {
//       console.error('Login failed:', err.response?.data?.message || err.message);
//       throw err;
//     }
//   };
// // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   // Check if the user is logged in on app load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch user data using the token
//       api.get('/auth/me')
//         .then((response) => setUser(response.data.user))
//         .catch((err) => {
//           console.error('Failed to fetch user:', err);
//           logout();
//         });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Add token to default headers for all future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user profile
          const response = await api.get('/auth/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // const login = async (email, password) => {
  //   try {
  //     const response = await api.post('/auth/login', { email, password });
  //     const { token, user: userData } = response.data;
      
  //     // Store token and set default auth header
  //     localStorage.setItem('token', token);
  //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
  //     setUser(userData);
  //     return userData;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setUser(response.data.user); // Update user state
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
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