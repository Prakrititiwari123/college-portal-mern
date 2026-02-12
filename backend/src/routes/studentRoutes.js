import express from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/studentController.js';
import { verifyToken, RolesAllowed } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, RolesAllowed('STUDENT'), getStudentProfile);
router.put('/profile', verifyToken, RolesAllowed('STUDENT'), updateStudentProfile);

export default router;
