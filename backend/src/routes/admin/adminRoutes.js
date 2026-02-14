import express from "express";
import {
  getAllStudents,
  getAllFaculty,
  createCourse,
  getAllCourses,
  createFeeStructure,
  postAnnouncement,
  getAllAnnouncements,
  deleteUser,
  getUserStats
} from "../../controllers/admin/adminController.js";
import { OtpProtect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes - Admin only
router.get("/students", OtpProtect, getAllStudents);
router.get("/faculty", OtpProtect, getAllFaculty);
router.delete("/users/:userId", OtpProtect, deleteUser);
router.get("/stats", OtpProtect, getUserStats);

// Course Management
router.post("/courses", OtpProtect, createCourse);
router.get("/courses", OtpProtect, getAllCourses);

// Fee Management
router.post("/fee-structure", OtpProtect, createFeeStructure);

// Announcements
router.post("/announcements", OtpProtect, postAnnouncement);
router.get("/announcements", OtpProtect, getAllAnnouncements);

export default router;
