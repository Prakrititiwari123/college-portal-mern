import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function AdminRegister() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showAdminKey, setShowAdminKey] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        adminKey: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await register('/admin/register', formData);
            setSuccess(result.message || 'Registration successful! Please login.');
            setTimeout(() => {
                navigate('/login/admin');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
            <div className="max-w-md mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-semibold"
                >
                    <FaArrowLeft /> Back to Home
                </button>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Registration</h2>
                    <p className="text-center text-gray-600 mb-8">Create SuperAdmin account (Authorized users only)</p>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Admin Name"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@college.edu"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="SecurePass@123"
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Min 8 chars, 1 uppercase, 1 number, 1 special char
                            </p>
                        </div>

                        {/* Admin Key */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Key (Required)</label>
                            <div className="relative">
                                <input
                                    type={showAdminKey ? 'text' : 'password'}
                                    name="adminKey"
                                    value={formData.adminKey}
                                    onChange={handleChange}
                                    placeholder="Enter admin key"
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowAdminKey(!showAdminKey)}
                                    className="absolute right-3 top-2.5 text-gray-600"
                                >
                                    {showAdminKey ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Contact system administrator for the admin key
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login/admin')}
                            className="text-purple-500 hover:text-purple-600 font-semibold"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
