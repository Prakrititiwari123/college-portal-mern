import React, { useState } from 'react';
import MyCourses from './MyCourses';
import ManageStudents from './ManageStudents';
import UploadMarks from './UploadMarks';
import MarkAttendance from './MarkAttendance';
import Reports from './Reports';
import Profile from './Profile';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const tabs = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'students', label: 'Manage Students', icon: '👨‍🎓' },
    { id: 'marks', label: 'Upload Marks', icon: '📝' },
    { id: 'attendance', label: 'Mark Attendance', icon: '✓' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <MyCourses />;
      case 'students':
        return <ManageStudents />;
      case 'marks':
        return <UploadMarks />;
      case 'attendance':
        return <MarkAttendance />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      default:
        return <MyCourses />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Faculty Dashboard</h1>
          <p className="text-green-100 mt-2">Manage your courses and students</p>
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
                    ? 'bg-green-600 text-white'
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

export default FacultyDashboard;
