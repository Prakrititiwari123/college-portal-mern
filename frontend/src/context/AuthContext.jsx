import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token', tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const register = async (endpoint, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (endpoint, credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/auth${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            login({
                id: data.userId,
                name: data.name,
                email: data.email,
                role: data.role,
            }, data.token);
            
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, register, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
