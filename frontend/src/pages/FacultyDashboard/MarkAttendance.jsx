import React, { useState } from 'react';

const MarkAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState([
    { studentId: 1, name: 'John Doe', rollNo: 'CSE21001', present: true },
    { studentId: 2, name: 'Jane Smith', rollNo: 'CSE21002', present: true },
    { studentId: 3, name: 'Bob Wilson', rollNo: 'CSE21003', present: false }
  ]);

  const toggleAttendance = (index) => {
    const newAttendance = [...attendance];
    newAttendance[index].present = !newAttendance[index].present;
    setAttendance(newAttendance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend
    alert('Attendance marked successfully!');
  };

  const presentCount = attendance.filter(a => a.present).length;
  const absentCount = attendance.length - presentCount;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

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
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="bg-green-50 p-3 rounded flex-1">
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
          </div>
          <div className="bg-red-50 p-3 rounded flex-1">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{absentCount}</p>
          </div>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Roll Number</th>
                <th className="px-4 py-2 text-center">Present</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((student, index) => (
                <tr key={student.studentId} className="border-b">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => toggleAttendance(index)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          disabled={!selectedCourse || !selectedDate}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;
