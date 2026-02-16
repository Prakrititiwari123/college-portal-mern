import express from "express";
import {
  UserRegister,
  UserLogin,
  UserLogout,
  UserGenOTP,
  UserVerifyOtp,
  UserForgetPassword,
  login
} from "../../controllers/authController.js";
import { OtpProtect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

const allowedRoles = new Set(["student", "faculty", "admin"]);

const getRoleOrError = (role) => {
  const normalizedRole = role?.toLowerCase();
  if (!allowedRoles.has(normalizedRole)) {
    return { error: "Invalid user type" };
  }
  return { role: normalizedRole };
};

// Role-based auth routes (match frontend URLs)
router.post("/:role/login", (req, res, next) => {
  const { role, error } = getRoleOrError(req.params.role);
  if (error) {
    return res.status(400).json({ message: error });
  }
  return login(role)(req, res, next);
});

router.post("/:role/register", (req, res, next) => {
  const { role, error } = getRoleOrError(req.params.role);
  if (error) {
    return res.status(400).json({ message: error });
  }
  req.body = { ...req.body, role };
  return UserRegister(req, res, next);
});

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);

router.post("/gen-otp", UserGenOTP);
router.post("/verify-otp", UserVerifyOtp);
router.post("/reset-password", UserForgetPassword);


// router.post("/genOtp", UserGenOTP);
// router.post("/verifyOtp", UserVerifyOtp);
// router.post("/forgot-password", OtpProtect, UserForgetPassword); 

export default router;
