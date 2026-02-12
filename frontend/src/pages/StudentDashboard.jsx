import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaBook, FaGraduationCap, FaChartBar } from 'react-icons/fa';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </nav>

            {/* Welcome Section */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name}!</h2>
                    <p className="text-gray-600 text-lg">Email: {user?.email}</p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Courses Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Courses</h3>
                            <FaBook className="text-4xl text-blue-500" />
                        </div>
                        <p className="text-4xl font-bold text-blue-600 mb-2">6</p>
                        <p className="text-sm text-gray-600">Active courses</p>
                    </div>

                    {/* GPA Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">GPA</h3>
                            <FaGraduationCap className="text-4xl text-green-500" />
                        </div>
                        <p className="text-4xl font-bold text-green-600 mb-2">3.8</p>
                        <p className="text-sm text-gray-600">Current semester</p>
                    </div>

                    {/* Attendance Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Attendance</h3>
                            <FaChartBar className="text-4xl text-purple-500" />
                        </div>
                        <p className="text-4xl font-bold text-purple-600 mb-2">92%</p>
                        <p className="text-sm text-gray-600">Overall attendance</p>
                    </div>

                    {/* Assignments Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Assignments</h3>
                            <FaBook className="text-4xl text-orange-500" />
                        </div>
                        <p className="text-4xl font-bold text-orange-600 mb-2">8</p>
                        <p className="text-sm text-gray-600">Pending submissions</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <p className="text-gray-700">Grade posted for Data Structures</p>
                            <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <p className="text-gray-700">New assignment: Web Development</p>
                            <span className="text-sm text-gray-500">5 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <p className="text-gray-700">Class cancelled: Database Systems</p>
                            <span className="text-sm text-gray-500">1 week ago</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
