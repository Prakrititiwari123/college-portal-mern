import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/courses`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Mock data
      setCourses([
        { _id: 1, code: 'CS101', name: 'Data Structures', credits: 3, faculty: 'Dr. John Smith', semester: 3 },
        { _id: 2, code: 'CS102', name: 'Algorithms', credits: 3, faculty: 'Dr. Jane Doe', semester: 3 },
        { _id: 3, code: 'CS103', name: 'Database Systems', credits: 4, faculty: 'Dr. Bob Wilson', semester: 3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800">{course.code}</h3>
            <p className="text-gray-600 mb-2">{course.name}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Credits: {course.credits}</p>
              <p>Faculty: {course.faculty}</p>
              <p>Semester: {course.semester}</p>
            </div>
            <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-500 py-8">No courses enrolled yet</p>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          <span className="font-bold">Total Courses:</span> {courses.length} | 
          <span className="font-bold ml-4">Total Credits:</span> {courses.reduce((sum, c) => sum + c.credits, 0)}
        </p>
      </div>
    </div>
  );
};

export default MyCourses;
