import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const query = useQuery();
    const token = query.get('token') || '';
    const { resetPassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) setError('No token provided');
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await resetPassword(token, newPassword);
            setMessage('Password reset successful. Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                <p className="text-sm text-gray-600 mb-4">Provide a new password for your account.</p>

                {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg" disabled={loading || !token}>
                        {loading ? 'Submitting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
