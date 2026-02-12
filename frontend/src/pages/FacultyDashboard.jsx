import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaBook, FaUsers, FaClipboard, FaChartBar } from 'react-icons/fa';

export default function FacultyDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h1>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Prof. {user?.name}!</h2>
                    <p className="text-gray-600 text-lg">Email: {user?.email}</p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Classes Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Classes</h3>
                            <FaBook className="text-4xl text-green-500" />
                        </div>
                        <p className="text-4xl font-bold text-green-600 mb-2">4</p>
                        <p className="text-sm text-gray-600">Active classes</p>
                    </div>

                    {/* Students Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Students</h3>
                            <FaUsers className="text-4xl text-blue-500" />
                        </div>
                        <p className="text-4xl font-bold text-blue-600 mb-2">120</p>
                        <p className="text-sm text-gray-600">Total students</p>
                    </div>

                    {/* Assignments Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Assignments</h3>
                            <FaClipboard className="text-4xl text-purple-500" />
                        </div>
                        <p className="text-4xl font-bold text-purple-600 mb-2">8</p>
                        <p className="text-sm text-gray-600">Pending reviews</p>
                    </div>

                    {/* Attendance Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Attendance</h3>
                            <FaChartBar className="text-4xl text-orange-500" />
                        </div>
                        <p className="text-4xl font-bold text-orange-600 mb-2">95%</p>
                        <p className="text-sm text-gray-600">Class average</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition text-left">
                            <p className="font-semibold text-gray-800">Mark Attendance</p>
                            <p className="text-sm text-gray-600">Record student attendance</p>
                        </button>
                        <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left">
                            <p className="font-semibold text-gray-800">Post Grades</p>
                            <p className="text-sm text-gray-600">Submit student grades</p>
                        </button>
                        <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left">
                            <p className="font-semibold text-gray-800">Create Assignment</p>
                            <p className="text-sm text-gray-600">Create new assignment</p>
                        </button>
                        <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-left">
                            <p className="font-semibold text-gray-800">View Reports</p>
                            <p className="text-sm text-gray-600">Generate course reports</p>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
