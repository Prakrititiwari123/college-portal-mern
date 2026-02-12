import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaTimes } from 'react-icons/fa';

export default function ForgotPasswordModal({ isOpen, onClose }) {
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
            setMessage('Reset link sent to your email. Please check your inbox.');
            setEmail('');
            setTimeout(() => {
                onClose();
                setMessage('');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@college.edu"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg disabled:bg-gray-400 transition"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="w-full mt-3 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
