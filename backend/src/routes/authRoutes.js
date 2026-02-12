import express from 'express';
import {
    registerStudent,
    registerFaculty,
    registerAdmin,
    loginStudent,
    loginFaculty,
    loginAdmin,
    forgotPassword,
    resetPassword,
    changePassword,
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Student Registration and Login
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

// Faculty Registration and Login
router.post('/faculty/register', registerFaculty);
router.post('/faculty/login', loginFaculty);

// Admin Registration and Login
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Change password (authenticated)
router.post('/change-password', verifyToken, changePassword);

export default router;
