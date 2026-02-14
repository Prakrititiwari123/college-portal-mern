import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/marks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMarks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching marks:', error);
      // Mock data
      setMarks([
        { _id: 1, courseCode: 'CS101', courseName: 'Data Structures', midterm: 38, final: 42, assignment: 8, total: 88, grade: 'A' },
        { _id: 2, courseCode: 'CS102', courseName: 'Algorithms', midterm: 35, final: 40, assignment: 9, total: 84, grade: 'A' },
        { _id: 3, courseCode: 'CS103', courseName: 'Database Systems', midterm: 36, final: 38, assignment: 7, total: 81, grade: 'B+' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) return <div className="text-center py-8">Loading marks...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Marks & Grades</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Course Code</th>
              <th className="px-4 py-2 text-left">Course Name</th>
              <th className="px-4 py-2 text-center">Midterm</th>
              <th className="px-4 py-2 text-center">Final</th>
              <th className="px-4 py-2 text-center">Assignment</th>
              <th className="px-4 py-2 text-center">Total</th>
              <th className="px-4 py-2 text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map(mark => (
              <tr key={mark._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{mark.courseCode}</td>
                <td className="px-4 py-3">{mark.courseName}</td>
                <td className="px-4 py-3 text-center">{mark.midterm}</td>
                <td className="px-4 py-3 text-center">{mark.final}</td>
                <td className="px-4 py-3 text-center">{mark.assignment}</td>
                <td className="px-4 py-3 text-center font-bold text-lg">{mark.total}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded font-bold ${getGradeColor(mark.grade)}`}>
                    {mark.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {marks.length === 0 && (
        <p className="text-center text-gray-500 py-8">No marks available yet</p>
      )}

      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Download Marks Sheet
        </button>
      </div>
    </div>
  );
};

export default MyMarks;
