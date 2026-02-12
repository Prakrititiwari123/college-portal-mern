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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !user) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                // ignore
            }
        }
    }, []);

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

    const authFetch = async (url, options = {}) => {
        const headers = options.headers || {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';

        const response = await fetch(url, { ...options, headers });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Request failed');
        return data;
    };

    const forgotPassword = async (email) => {
        return await authFetch(`${API_URL}/api/auth/forgot-password`, { method: 'POST', body: JSON.stringify({ email }) });
    };

    const resetPassword = async (tokenParam, newPassword) => {
        return await authFetch(`${API_URL}/api/auth/reset-password`, { method: 'POST', body: JSON.stringify({ token: tokenParam, newPassword }) });
    };

    const changePassword = async (oldPassword, newPassword) => {
        return await authFetch(`${API_URL}/api/auth/change-password`, { method: 'POST', body: JSON.stringify({ oldPassword, newPassword }) });
    };

    const getProfile = async () => {
        return await authFetch(`${API_URL}/api/student/profile`, { method: 'GET' });
    };

    const updateProfile = async (updates) => {
        return await authFetch(`${API_URL}/api/student/profile`, { method: 'PUT', body: JSON.stringify(updates) });
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, register, loginUser, logout, forgotPassword, resetPassword, changePassword, getProfile, updateProfile, setUser }}>
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
