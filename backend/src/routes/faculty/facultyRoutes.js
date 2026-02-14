import express from "express";
import {
  getAssignedCourses,
  getStudentsByCourse,
  uploadMarks,
  markAttendance,
  getAttendanceReport,
  getMarksReport,
  getProfile,
  updateProfile
} from "../../controllers/faculty/facultyController.js";
import { OtpProtect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes - Faculty only
router.get("/courses", OtpProtect, getAssignedCourses);
router.get("/courses/:courseId/students", OtpProtect, getStudentsByCourse);

// Marks Management
router.post("/marks", OtpProtect, uploadMarks);
router.get("/marks/:courseId", OtpProtect, getMarksReport);

// Attendance Management
router.post("/attendance", OtpProtect, markAttendance);
router.get("/attendance/:courseId", OtpProtect, getAttendanceReport);

// Profile Management
router.get("/profile", OtpProtect, getProfile);
router.put("/profile", OtpProtect, updateProfile);

export default router;
