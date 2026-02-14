import React, { useState } from 'react';

const ManageFees = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    semester: '',
    tuition: '',
    lab: '',
    library: '',
    sports: '',
    miscellaneous: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send to backend
    const total = Object.values(formData)
      .slice(1)
      .reduce((acc, val) => acc + parseFloat(val || 0), 0);
    
    setFeeStructures([...feeStructures, { ...formData, total, _id: Date.now() }]);
    setFormData({ semester: '', tuition: '', lab: '', library: '', sports: '', miscellaneous: '' });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Fee Structure Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          {showForm ? 'Cancel' : '+ Add Fee Structure'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Semester</label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="1-8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tuition Fee</label>
              <input
                type="number"
                name="tuition"
                value={formData.tuition}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lab Fee</label>
              <input
                type="number"
                name="lab"
                value={formData.lab}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Library Fee</label>
              <input
                type="number"
                name="library"
                value={formData.library}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sports Fee</label>
              <input
                type="number"
                name="sports"
                value={formData.sports}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Miscellaneous Fee</label>
              <input
                type="number"
                name="miscellaneous"
                value={formData.miscellaneous}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Create Fee Structure
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Semester</th>
              <th className="px-4 py-2 text-right">Tuition</th>
              <th className="px-4 py-2 text-right">Lab</th>
              <th className="px-4 py-2 text-right">Library</th>
              <th className="px-4 py-2 text-right">Sports</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeStructures.map(fee => (
              <tr key={fee._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{fee.semester}</td>
                <td className="px-4 py-3 text-right">₹{fee.tuition}</td>
                <td className="px-4 py-3 text-right">₹{fee.lab}</td>
                <td className="px-4 py-3 text-right">₹{fee.library}</td>
                <td className="px-4 py-3 text-right">₹{fee.sports}</td>
                <td className="px-4 py-3 text-right font-bold">₹{fee.total}</td>
                <td className="px-4 py-3">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {feeStructures.length === 0 && !showForm && (
        <p className="text-center text-gray-500 py-4">No fee structures defined yet.</p>
      )}
    </div>
  );
};

export default ManageFees;
