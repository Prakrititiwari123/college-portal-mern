import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // useEffect(() => {
  //   if (token) {
  //     fetchUser();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [token]);

  useEffect(() => {
    if (token) {
       const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // User set karo without API call
      setLoading(false);
    } else {
      fetchUser();  // Agar saved user nahi hai tabhi API call karo
    }
  } else {
    setLoading(false);
  }
}, [token]);


  const fetchUser = async () => {
    try {
      // Try to fetch user profile from auth/student/profile or similar endpoint
      const response = await axios.get('https://college-portal-mern-backend.onrender.com/api/student/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data.student);
    } catch (error) {
      console.error('Fetch user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, role) => {
    // try {
    //   const response = await axios.post(
    //     `https://college-portal-mern-backend.onrender.com/api/auth/${role}/login`,
    //     { email, password },
    //     { headers: { 'Content-Type': 'application/json' } }
    //   );
      
    //   const { token: newToken, ...userData } = response.data;
    //   localStorage.setItem('token', newToken);
    //   setToken(newToken);
    //   setUser(userData);
    try {
      const response = await axios.post(
        `https://college-portal-mern-backend.onrender.com/api/auth/${role}/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      const { token: newToken, ...userData } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      
      return { success: true, ...userData };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  //new line to remove user data on logout
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    role: user?.role,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};