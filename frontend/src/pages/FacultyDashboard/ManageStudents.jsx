import React, { useState } from 'react';

const ManageStudents = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([
    { _id: 1, name: 'John Doe', rollNo: 'CSE21001', email: 'john@college.edu' },
    { _id: 2, name: 'Jane Smith', rollNo: 'CSE21002', email: 'jane@college.edu' },
    { _id: 3, name: 'Bob Wilson', rollNo: 'CSE21003', email: 'bob@college.edu' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

      <div className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Choose a course</option>
            <option value="CS101">CS101 - Data Structures</option>
            <option value="CS102">CS102 - Algorithms</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Roll Number</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.rollNo}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Grades
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <p className="text-center text-gray-500 py-4">No students found</p>
      )}
    </div>
  );
};

export default ManageStudents;
