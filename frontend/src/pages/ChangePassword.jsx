import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function Inner() {
    const navigate = useNavigate();
    const { changePassword } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await changePassword(oldPassword, newPassword);
            setMessage('Password changed successfully.');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError(err.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder="Old password" type="password" className="w-full px-4 py-2 border rounded-lg" required />
                    <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="New password" type="password" className="w-full px-4 py-2 border rounded-lg" required />
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg" disabled={loading}>{loading? 'Changing...' : 'Change Password'}</button>
                </form>
            </div>
        </div>
    );
}

export default function ChangePassword() {
    return (
        <ProtectedRoute>
            <Inner />
        </ProtectedRoute>
    );
}
