import React, { use, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

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
    const { user } = useAuth();
   
    
    return (
        <Router>
           
                <Routes>
                    {/* Home */}
                    <Route path="/" element={<Home />} />
                    {/* Registration Routes */}
                    <Route path="/register" element={ <Register />} />

                    {/* Login Routes */}
                    {/* <Route path="/login/:role" element={!user?<Login />:<Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />} /> */}
                    <Route path="/login/:role" element={<Login />} />
                    <Route path="/login" element={<Navigate to="/" replace />} />

                    {/* Password Management */}
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                    {/* Dashboard Routes - Protected */}
                    <Route
                        path="/student-dashboard"
                        element={user?.role === "Student" ? <StudentDashboard /> : <Navigate to="/login/student" replace />}
                    />
                    <Route
                        path="/faculty-dashboard"
                        element={user?.role === "Faculty" ? <FacultyDashboard /> : <Navigate to="/login/faculty" replace />}
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login/admin" replace />
                        }
                    />

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
        </Router>
    );
}

export default App;
