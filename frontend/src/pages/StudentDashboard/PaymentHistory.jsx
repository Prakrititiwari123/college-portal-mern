import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/payment-history`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPayments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      // Mock data
      setPayments([
        {
          _id: 1,
          semester: 3,
          amount: 62000,
          date: '2024-04-01',
          method: 'Credit Card',
          status: 'Completed',
          transactionId: 'TXN2024040001'
        },
        {
          _id: 2,
          semester: 2,
          amount: 62000,
          date: '2024-01-15',
          method: 'UPI',
          status: 'Completed',
          transactionId: 'TXN2024011501'
        },
        {
          _id: 3,
          semester: 1,
          amount: 62000,
          date: '2023-10-20',
          method: 'Net Banking',
          status: 'Completed',
          transactionId: 'TXN2023102001'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-8">Loading payment history...</div>;

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <div className="mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
        <p className="text-green-100">Total Amount Paid</p>
        <p className="text-5xl font-bold">₹{totalPaid.toLocaleString()}</p>
        <p className="text-green-100 mt-2">{payments.length} payment(s)</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Semester</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{payment.semester}</td>
                <td className="px-4 py-3 text-right font-bold">₹{payment.amount.toLocaleString()}</td>
                <td className="px-4 py-3">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{payment.method}</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">{payment.transactionId}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline text-sm">
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <p className="text-center text-gray-500 py-8">No payment history available</p>
      )}
    </div>
  );
};

export default PaymentHistory;
