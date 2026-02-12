import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
    const navigate = useNavigate();
    const { role } = useParams();
    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const getConfig = () => {
        switch (role) {
            case 'student':
                return {
                    title: 'Student Login',
                    endpoint: '/student/login',
                    bgColor: 'from-blue-50 via-indigo-50 to-purple-50',
                    buttonColor: 'bg-blue-500 hover:bg-blue-600',
                    accentColor: 'text-blue-600 border-blue-500',
                    registerLink: '/register/student',
                };
            case 'faculty':
                return {
                    title: 'Faculty Login',
                    endpoint: '/faculty/login',
                    bgColor: 'from-green-50 via-emerald-50 to-teal-50',
                    buttonColor: 'bg-green-500 hover:bg-green-600',
                    accentColor: 'text-green-600 border-green-500',
                    registerLink: '/register/faculty',
                };
            case 'admin':
                return {
                    title: 'Admin Login',
                    endpoint: '/admin/login',
                    bgColor: 'from-purple-50 via-pink-50 to-red-50',
                    buttonColor: 'bg-purple-500 hover:bg-purple-600',
                    accentColor: 'text-purple-600 border-purple-500',
                    registerLink: '/register/admin',
                };
            default:
                return {};
        }
    };

    const config = getConfig();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await loginUser(config.endpoint, credentials);
            // Redirect based on role
            switch (result.role) {
                case 'STUDENT':
                    navigate('/student-dashboard');
                    break;
                case 'FACULTY':
                    navigate('/faculty-dashboard');
                    break;
                case 'ADMIN':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} py-12 px-4`}>
            <div className="max-w-md mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-2 ${config.accentColor} hover:opacity-80 mb-8 font-semibold`}
                >
                    <FaArrowLeft /> Back to Home
                </button>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{config.title}</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="your.email@college.edu"
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
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
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
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 ${config.buttonColor} text-white font-bold rounded-lg disabled:bg-gray-400 transition transform hover:scale-105 active:scale-95`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate(config.registerLink)}
                            className={`${config.accentColor} hover:underline font-semibold`}
                        >
                            Register here
                        </button>
                    </p>

                    {/* Forgot Password */}
                    <p className="text-center mt-4">
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                            Forgot password?
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
