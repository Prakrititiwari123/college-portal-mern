import React, { useState } from 'react';
import MyCourses from './MyCourses';
import MyMarks from './MyMarks';
import MyAttendance from './MyAttendance';
import Announcements from './Announcements';
import FeesPayment from './FeesPayment';
import PaymentHistory from './PaymentHistory';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  

  const tabs = [
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'marks', label: 'My Marks', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '✓' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'fees', label: 'Pay Fees', icon: '💳' },
    { id: 'history', label: 'Payment History', icon: '📜' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <MyCourses />;
      case 'marks':
        return <MyMarks />;
      case 'attendance':
        return <MyAttendance />;
      case 'announcements':
        return <Announcements />;
      case 'fees':
        return <FeesPayment />;
      case 'history':
        return <PaymentHistory />;
      default:
        return <MyCourses />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Student Dashboard</h1>
          <p className="text-blue-100 mt-2">Track your courses, marks, and payments</p>
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
                    ? 'bg-blue-600 text-white'
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

export default StudentDashboard;
