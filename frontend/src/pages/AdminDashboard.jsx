import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUsers, FaSchool, FaCog, FaChartBar, FaShieldAlt } from 'react-icons/fa';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-red-50">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, SuperAdmin {user?.name}!</h2>
                    <p className="text-gray-600 text-lg">Email: {user?.email}</p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Total Users</h3>
                            <FaUsers className="text-4xl text-blue-500" />
                        </div>
                        <p className="text-4xl font-bold text-blue-600 mb-2">542</p>
                        <p className="text-sm text-gray-600">All registered users</p>
                    </div>

                    {/* Students Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Students</h3>
                            <FaSchool className="text-4xl text-green-500" />
                        </div>
                        <p className="text-4xl font-bold text-green-600 mb-2">450</p>
                        <p className="text-sm text-gray-600">Active students</p>
                    </div>

                    {/* Faculty Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Faculty</h3>
                            <FaShieldAlt className="text-4xl text-purple-500" />
                        </div>
                        <p className="text-4xl font-bold text-purple-600 mb-2">92</p>
                        <p className="text-sm text-gray-600">Faculty members</p>
                    </div>

                    {/* System Health Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">System</h3>
                            <FaCog className="text-4xl text-orange-500" />
                        </div>
                        <p className="text-4xl font-bold text-orange-600 mb-2">99%</p>
                        <p className="text-sm text-gray-600">Uptime</p>
                    </div>
                </div>

                {/* Admin Controls */}
                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">System Management</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left border-2 border-blue-200">
                            <FaUsers className="text-2xl text-blue-600 mb-2" />
                            <p className="font-semibold text-gray-800">Manage Users</p>
                            <p className="text-sm text-gray-600">Add/Edit/Delete users</p>
                        </button>
                        <button className="p-6 bg-green-50 hover:bg-green-100 rounded-lg transition text-left border-2 border-green-200">
                            <FaSchool className="text-2xl text-green-600 mb-2" />
                            <p className="font-semibold text-gray-800">Manage Departments</p>
                            <p className="text-sm text-gray-600">Configure departments</p>
                        </button>
                        <button className="p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left border-2 border-purple-200">
                            <FaCog className="text-2xl text-purple-600 mb-2" />
                            <p className="font-semibold text-gray-800">System Settings</p>
                            <p className="text-sm text-gray-600">Configure system</p>
                        </button>
                        <button className="p-6 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-left border-2 border-orange-200">
                            <FaChartBar className="text-2xl text-orange-600 mb-2" />
                            <p className="font-semibold text-gray-800">View Reports</p>
                            <p className="text-sm text-gray-600">Analyze system data</p>
                        </button>
                        <button className="p-6 bg-red-50 hover:bg-red-100 rounded-lg transition text-left border-2 border-red-200">
                            <FaShieldAlt className="text-2xl text-red-600 mb-2" />
                            <p className="font-semibold text-gray-800">Security Settings</p>
                            <p className="text-sm text-gray-600">Manage security</p>
                        </button>
                        <button className="p-6 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition text-left border-2 border-indigo-200">
                            <FaUsers className="text-2xl text-indigo-600 mb-2" />
                            <p className="font-semibold text-gray-800">Audit Logs</p>
                            <p className="text-sm text-gray-600">View system logs</p>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <p className="text-gray-700">New student registered: Raj Kumar</p>
                            <span className="text-sm text-gray-500">1 hour ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <p className="text-gray-700">Faculty member added: Dr. Sharma</p>
                            <span className="text-sm text-gray-500">3 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <p className="text-gray-700">System backup completed</p>
                            <span className="text-sm text-gray-500">5 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                            <p className="text-gray-700">Department updated: CSE</p>
                            <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
