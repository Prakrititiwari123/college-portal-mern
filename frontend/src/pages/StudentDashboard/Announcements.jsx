import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/announcements`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAnnouncements(response.data.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // Mock data
      setAnnouncements([
        {
          _id: 1,
          title: 'Semester Exams Schedule Released',
          content: 'The final semester exams will be held from May 15-30, 2024. Check your course schedule for specific dates.',
          priority: 'high',
          date: '2024-04-10'
        },
        {
          _id: 2,
          title: 'Library Extended Hours',
          content: 'The college library will remain open until 10 PM during exam preparations.',
          priority: 'normal',
          date: '2024-04-09'
        },
        {
          _id: 3,
          title: 'Sports Day Registration Open',
          content: 'Register for the annual sports day. Submit your names to the sports office by April 15.',
          priority: 'normal',
          date: '2024-04-08'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'medium':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : announcements.filter(a => a.priority === filter);

  if (loading) return <div className="text-center py-8">Loading announcements...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Announcements</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map(announce => (
          <div key={announce._id} className={`rounded-lg p-4 ${getPriorityColor(announce.priority)}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-gray-800 flex-1">{announce.title}</h3>
              <span className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${getPriorityBadge(announce.priority)}`}>
                {announce.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{announce.content}</p>
            <p className="text-sm text-gray-500">Posted on {new Date(announce.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <p className="text-center text-gray-500 py-8">No announcements with the selected priority</p>
      )}
    </div>
  );
};

export default Announcements;
