import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    totalAnnouncements: 0
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      // TODO: Fetch from backend
      setStats({
        totalStudents: 250,
        totalFaculty: 45,
        totalCourses: 60,
        totalAnnouncements: 12
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const StatCard = ({ label, value, icon, color }) => (
    <div className={`bg-${color}-50 border-l-4 border-${color}-500 rounded-lg p-6 shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-4xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-5xl opacity-20">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">College Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Students" value={stats.totalStudents} icon="👨‍🎓" color="blue" />
        <StatCard label="Total Faculty" value={stats.totalFaculty} icon="👨‍🏫" color="green" />
        <StatCard label="Total Courses" value={stats.totalCourses} icon="📚" color="purple" />
        <StatCard label="Announcements" value={stats.totalAnnouncements} icon="📢" color="yellow" />
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-purple-100">Average Students per Course</p>
            <p className="text-4xl font-bold">{(stats.totalStudents / stats.totalCourses).toFixed(1)}</p>
          </div>
          <div>
            <p className="text-purple-100">Students per Faculty</p>
            <p className="text-4xl font-bold">{(stats.totalStudents / stats.totalFaculty).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
