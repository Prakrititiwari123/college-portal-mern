import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await forgotPassword(email);
            setMessage('Reset link sent to email if account exists.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <p className="text-sm text-gray-600 mb-4">Enter your account email and we'll send a reset link.</p>

                {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@college.edu"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    <button className="w-full py-2 bg-indigo-600 text-white rounded-lg" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
