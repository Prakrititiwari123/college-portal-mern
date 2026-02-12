import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBookReader, FaChalkboardTeacher, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Home() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (token && user) {
            switch (user.role) {
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
                    break;
            }
        }
    }, [token, user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FaBookReader className="text-3xl text-indigo-600" />
                        <h1 className="text-2xl font-bold text-gray-800">College Portal</h1>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <div className="relative group">
                            <button className="px-6 py-2 text-indigo-600 hover:text-indigo-700 font-semibold border-2 border-indigo-600 rounded-lg hover:bg-indigo-50">
                                Login
                            </button>
                            <div className="hidden group-hover:block absolute top-full mt-0 w-48 bg-white rounded-lg shadow-xl z-10">
                                <button onClick={() => navigate('/login/student')} className="block w-full px-4 py-2 text-left hover:bg-blue-50 font-semibold text-blue-600 border-b">Student Login</button>
                                <button onClick={() => navigate('/login/faculty')} className="block w-full px-4 py-2 text-left hover:bg-green-50 font-semibold text-green-600 border-b">Faculty Login</button>
                                <button onClick={() => navigate('/login/admin')} className="block w-full px-4 py-2 text-left hover:bg-purple-50 font-semibold text-purple-600">Admin Login</button>
                            </div>
                        </div>
                        <button onClick={() => navigate('/register')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">
                            Register
                        </button>
                    </div>
                    <button className="md:hidden text-2xl" onClick={() => setShowMenu(!showMenu)}>
                        ☰
                    </button>
                </div>
                {showMenu && (
                    <div className="md:hidden bg-white border-t py-4 px-4 flex flex-col gap-2">
                        <p className="font-semibold text-gray-700 mb-2">Select Login Type:</p>
                        <button onClick={() => navigate('/login/student')} className="px-6 py-2 text-blue-600 hover:bg-blue-50 font-semibold w-full text-left border-l-4 border-blue-600">
                            Student Login
                        </button>
                        <button onClick={() => navigate('/login/faculty')} className="px-6 py-2 text-green-600 hover:bg-green-50 font-semibold w-full text-left border-l-4 border-green-600">
                            Faculty Login
                        </button>
                        <button onClick={() => navigate('/login/admin')} className="px-6 py-2 text-purple-600 hover:bg-purple-50 font-semibold w-full text-left border-l-4 border-purple-600">
                            Admin Login
                        </button>
                        <hr className="my-2" />
                        <button onClick={() => navigate('/register')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold w-full">
                            Register
                        </button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                    Welcome to College Portal
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                    Manage your academic journey with role-based access control
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Student Card */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-8">
                        <div className="flex justify-center mb-4">
                            <FaUser className="text-5xl text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Student</h3>
                        <p className="text-gray-600 mb-6">View courses, grades, and academic records releated to student</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/register/student')}
                                className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login/student')}
                                className="flex-1 px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 font-semibold"
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Faculty Card */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-8">
                        <div className="flex justify-center mb-4">
                            <FaChalkboardTeacher className="text-5xl text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Faculty</h3>
                        <p className="text-gray-600 mb-6">Manage courses, grades, and student attendance</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/register/faculty')}
                                className="flex-1 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login/faculty')}
                                className="flex-1 px-6 py-2 border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-50 font-semibold"
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Admin Card */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-8">
                        <div className="flex justify-center mb-4">
                            <FaKey className="text-5xl text-purple-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin</h3>
                        <p className="text-gray-600 mb-6">Manage users, departments, and system settings</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/register/admin')}
                                className="flex-1 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login/admin')}
                                className="flex-1 px-6 py-2 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 font-semibold"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8">Key Features</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-indigo-600 mb-2">Secure Authentication</h4>
                            <p className="text-gray-600">BCrypt hashed passwords with JWT token-based authentication</p>
                        </div>
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-indigo-600 mb-2">Role-Based Access</h4>
                            <p className="text-gray-600">Different features for students, faculty, and administrators</p>
                        </div>
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-indigo-600 mb-2">Real-time Updates</h4>
                            <p className="text-gray-600">Stay updated with instant notifications and alerts</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
