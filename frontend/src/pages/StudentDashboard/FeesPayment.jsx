import React, { useState } from 'react';

const FeesPayment = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [feeStructure, setFeeStructure] = useState({
    tuition: 50000,
    lab: 5000,
    library: 2000,
    sports: 3000,
    miscellaneous: 2000,
    total: 62000
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedSemester || !paymentMethod) {
      alert('Please select semester and payment method');
      return;
    }
    alert('Payment initiated! You will be redirected to the payment gateway.');
    // TODO: Integrate with payment gateway
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Fee Payment</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Semester</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Choose Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Fee Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tuition Fee</span>
                  <span>₹{feeStructure.tuition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lab Fee</span>
                  <span>₹{feeStructure.lab}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Library Fee</span>
                  <span>₹{feeStructure.library}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sports Fee</span>
                  <span>₹{feeStructure.sports}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Miscellaneous</span>
                  <span>₹{feeStructure.miscellaneous}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total Amount Due</span>
                  <span className="text-lg text-blue-600">₹{feeStructure.total}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Net Banking</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 mt-4"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Payment Information</h3>
              <p className="text-sm text-blue-800">
                Please ensure timely payment of fees to avoid any penalties. Online payment is secure and instant.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Payment Deadline</h3>
              <p className="text-sm text-blue-800">
                Fees must be paid by the last day of the month to avoid late charges.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Payment Receipt</h3>
              <p className="text-sm text-blue-800">
                A payment receipt will be sent to your registered email immediately after successful payment.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> No refund will be given once payment is processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesPayment;
