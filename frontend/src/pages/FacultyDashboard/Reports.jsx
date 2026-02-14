import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [selectedCourse, setSelectedCourse] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="attendance">Attendance Report</option>
            <option value="marks">Marks Report</option>
            <option value="performance">Class Performance</option>
          </select>
        </div>

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
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mr-2">
        Generate Report
      </button>
      <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
        Export as PDF
      </button>

      <div className="mt-8 bg-gray-50 rounded-lg p-6 min-h-96 flex items-center justify-center">
        <p className="text-gray-500 text-center">
          {selectedCourse ? 'Select a report type and click "Generate Report"' : 'Select a course to generate reports'}
        </p>
      </div>
    </div>
  );
};

export default Reports;
