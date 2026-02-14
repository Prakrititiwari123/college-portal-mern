import React, { useState } from 'react';
import ManageStudents from './ManageStudents';
import ManageFaculty from './ManageFaculty';
import ManageCourses from './ManageCourses';
import ManageFees from './ManageFees';
import Announcements from './Announcements';
import Statistics from './Statistics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('statistics');

  const tabs = [
    { id: 'statistics', label: 'Statistics', icon: '📊' },
    { id: 'students', label: 'Manage Students', icon: '👨‍🎓' },
    { id: 'faculty', label: 'Manage Faculty', icon: '👨‍🏫' },
    { id: 'courses', label: 'Manage Courses', icon: '📚' },
    { id: 'fees', label: 'Fee Structure', icon: '💰' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <Statistics />;
      case 'students':
        return <ManageStudents />;
      case 'faculty':
        return <ManageFaculty />;
      case 'courses':
        return <ManageCourses />;
      case 'fees':
        return <ManageFees />;
      case 'announcements':
        return <Announcements />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-purple-100 mt-2">Manage your college system</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-2 py-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
