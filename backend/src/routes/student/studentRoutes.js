import express from "express";
import {
  getProfile,
  updateProfile,
  getEnrolledCourses,
  getMarks,
  getAttendance,
  getAnnouncements,
  viewFeeStructure,
  recordFeePayment,
  getPaymentHistory,
  downloadMarksSheet
} from "../../controllers/student/studentController.js";
import { OtpProtect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes - Student only
router.get("/profile", OtpProtect, getProfile);
router.put("/profile", OtpProtect, updateProfile);

// Courses and Enrollments
router.get("/courses", OtpProtect, getEnrolledCourses);

// Marks
router.get("/marks", OtpProtect, getMarks);
router.get("/marks/download", OtpProtect, downloadMarksSheet);

// Attendance
router.get("/attendance", OtpProtect, getAttendance);

// Announcements
router.get("/announcements", OtpProtect, getAnnouncements);

// Fee Management
router.get("/fee-structure", OtpProtect, viewFeeStructure);
router.post("/fee-payment", OtpProtect, recordFeePayment);
router.get("/payment-history", OtpProtect, getPaymentHistory);

export default router;
