import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function StudentRegister() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        branch: '',
        enrollment_year: new Date().getFullYear(),
    });

    const branches = ['CSE', 'ECE', 'ME', 'CE', 'EEE', 'IT'];
    const years = [2024, 2025, 2026, 2027];

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
            const result = await register('/student/register', formData);
            setSuccess(result.message || 'Registration successful! Please login.');
            setTimeout(() => {
                navigate('/login/student');
            }, 1500);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-md mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 font-semibold"
                >
                    <FaArrowLeft /> Back to Home
                </button>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Student Registration</h2>
                    <p className="text-center text-gray-600 mb-8">Create your student account</p>

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
                                placeholder="Rahul Kumar"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
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
                                placeholder="rahul@college.edu"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
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
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
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
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
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

                        {/* Branch */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                            >
                                <option value="">Select Branch</option>
                                {branches.map((branch) => (
                                    <option key={branch} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>

                        {/* Enrollment Year */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Enrollment Year</label>
                            <select
                                name="enrollment_year"
                                value={formData.enrollment_year}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login/student')}
                            className="text-blue-500 hover:text-blue-600 font-semibold"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
