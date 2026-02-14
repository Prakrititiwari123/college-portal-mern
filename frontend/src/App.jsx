import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />

                    {/* Registration Routes */}
                    <Route path="/register" element={<Register />} />

                    {/* Login Routes */}
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/login" element={<Navigate to="/" replace />} />

                    {/* Password Management */}
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />

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
