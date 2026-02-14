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
        `${import.meta.env.VITE_API_URL}/faculty/courses`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Mock data
      setCourses([
        { _id: 1, code: 'CS101', name: 'Data Structures', credits: 3, students: 45 },
        { _id: 2, code: 'CS102', name: 'Algorithms', credits: 3, students: 50 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800">{course.code}</h3>
            <p className="text-gray-600">{course.name}</p>
            <div className="mt-3 text-sm text-gray-500">
              <p>Credits: {course.credits}</p>
              <p>Students: {course.students}</p>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-sm">
                View Students
              </button>
              <button className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 text-sm">
                Upload Materials
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-500 py-8">No courses assigned yet</p>
      )}
    </div>
  );
};

export default MyCourses;
