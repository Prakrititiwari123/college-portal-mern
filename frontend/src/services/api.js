import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  register: (userType, data) => api.post(`/auth/${userType}/register`, data),
  login: (userType, email, password) => api.post(`/auth/${userType}/login`, { email, password }),
  getProfile: (userType) => api.get(`/auth/${userType}/profile`),
  updateProfile: (userType, data) => api.put(`/auth/${userType}/profile`, data),
  changePassword: (data) => api.post('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Course Services
export const courseService = {
  getCourses: (filters = {}) => api.get('/student/courses', { params: filters }),
  enrollCourse: (courseId) => api.post(`/student/courses/${courseId}/enroll`),
  getEnrollments: (filters = {}) => api.get('/student/enrollments', { params: filters }),
  createCourse: (data) => api.post('/student/courses', data),
  getCourseStudents: (courseId) => api.get(`/student/courses/${courseId}/students`),
};

// Attendance Services
export const attendanceService = {
  getStudentAttendance: (filters = {}) => api.get('/student/attendance', { params: filters }),
  getCourseAttendance: (courseId, filters = {}) => api.get(`/student/attendance/${courseId}`, { params: filters }),
  markAttendance: (data) => api.post('/student/attendance/mark', data),
};

// Marks Services
export const marksService = {
  getStudentMarks: (filters = {}) => api.get('/student/marks', { params: filters }),
  updateMarks: (data) => api.post('/student/marks', data),
  getClassMarks: (courseId) => api.get(`/student/marks/${courseId}`),
};

// Fee Services
export const feeService = {
  getStudentFeeStructure: () => api.get('/student/fees/structure'),
  processPayment: (data) => api.post('/student/fees/payment', data),
  getPaymentHistory: () => api.get('/student/fees/history'),
  createFeeStructure: (data) => api.post('/student/fees/structure', data),
};

export default api;
