import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import StudentRegister from './pages/StudentRegister';
import FacultyRegister from './pages/FacultyRegister';
import AdminRegister from './pages/AdminRegister';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />

                    {/* Registration Routes */}
                    <Route path="/register/student" element={<StudentRegister />} />
                    <Route path="/register/faculty" element={<FacultyRegister />} />
                    <Route path="/register/admin" element={<AdminRegister />} />
                    <Route path="/register" element={<Navigate to="/" replace />} />

                    {/* Login Routes */}
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/login" element={<Navigate to="/" replace />} />

                    {/* Dashboard Routes - Protected */}
                    <Route
                        path="/student-dashboard"
                        element={
                            <ProtectedRoute requiredRole="STUDENT">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/faculty-dashboard"
                        element={
                            <ProtectedRoute requiredRole="FACULTY">
                                <FacultyDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
