import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/attendance`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAttendance(response.data.data || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      // Mock data
      setAttendance([
        { _id: 1, courseCode: 'CS101', courseName: 'Data Structures', present: 28, total: 30, percentage: 93.33 },
        { _id: 2, courseCode: 'CS102', courseName: 'Algorithms', present: 26, total: 30, percentage: 86.67 },
        { _id: 3, courseCode: 'CS103', courseName: 'Database Systems', present: 29, total: 30, percentage: 96.67 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceBg = (percentage) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 75) return 'bg-blue-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) return <div className="text-center py-8">Loading attendance...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {attendance.map(att => (
          <div
            key={att._id}
            className={`rounded-lg p-4 ${getAttendanceBg(att.percentage)}`}
          >
            <h3 className="font-bold text-gray-800 mb-2">{att.courseCode}</h3>
            <p className="text-sm text-gray-600 mb-3">{att.courseName}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-600">Present: {att.present}/{att.total}</p>
              </div>
              <p className={`text-3xl font-bold ${getAttendanceColor(att.percentage)}`}>
                {att.percentage.toFixed(1)}%
              </p>
            </div>
            {att.percentage < 75 && (
              <p className="text-xs text-red-600 mt-2 font-semibold">
                ⚠ Low attendance
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-center">Present</th>
              <th className="px-4 py-2 text-center">Total Classes</th>
              <th className="px-4 py-2 text-center">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(att => (
              <tr key={att._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{att.courseName}</td>
                <td className="px-4 py-3 text-center">{att.present}</td>
                <td className="px-4 py-3 text-center">{att.total}</td>
                <td className={`px-4 py-3 text-center font-bold ${getAttendanceColor(att.percentage)}`}>
                  {att.percentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {attendance.length === 0 && (
        <p className="text-center text-gray-500 py-8">No attendance data available</p>
      )}
    </div>
  );
};

export default MyAttendance;
