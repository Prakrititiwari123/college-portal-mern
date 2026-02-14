import React, { useState } from 'react';

const UploadMarks = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [assessment, setAssessment] = useState('');
  const [marks, setMarks] = useState([
    { studentId: 1, name: 'John Doe', rollNo: 'CSE21001', marks: 85 },
    { studentId: 2, name: 'Jane Smith', rollNo: 'CSE21002', marks: 90 },
    { studentId: 3, name: 'Bob Wilson', rollNo: 'CSE21003', marks: 78 }
  ]);

  const handleMarksChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index].marks = value;
    setMarks(newMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend
    alert('Marks uploaded successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Marks</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose a course</option>
              <option value="CS101">CS101 - Data Structures</option>
              <option value="CS102">CS102 - Algorithms</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assessment Type</label>
            <select
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose assessment</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
              <option value="assignment">Assignment</option>
              <option value="project">Project</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Roll Number</th>
                <th className="px-4 py-2 text-left">Marks (Out of 100)</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((student, index) => (
                <tr key={student.studentId} className="border-b">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.marks}
                      onChange={(e) => handleMarksChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded max-w-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          disabled={!selectedCourse || !assessment}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          Upload Marks
        </button>
      </form>
    </div>
  );
};

export default UploadMarks;
