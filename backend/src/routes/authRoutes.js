import express from 'express';
import {
    registerStudent,
    registerFaculty,
    registerAdmin,
    loginStudent,
    loginFaculty,
    loginAdmin,
} from '../controllers/authController.js';

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

export default router;
