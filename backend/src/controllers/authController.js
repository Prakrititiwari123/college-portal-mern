import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/jwt.js';
import { validationResult } from 'express-validator';
import OTP from '../models/OTP.js';
import { sendMail } from '../utils/mailer.js';

// Student Registration
export const registerStudent = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, branch, enrollment_year } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create new student
    const student = new Student({
      name,
      email,
      phone,
      password_hash: password,
      branch,
      enrollment_year,
      semester: 1 // Default to first semester
    });

    // Generate roll number
    const year = enrollment_year.toString().slice(-2);
    const count = await Student.countDocuments({ branch, enrollment_year });
    student.roll_number = `${branch}${year}${(count + 1).toString().padStart(3, '0')}`;

    await student.save();

    res.status(201).json({
      id: student._id,
      name: student.name,
      email: student.email,
      role: 'Student',
      message: 'Registration successful. Please login.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Faculty Registration
export const registerFaculty = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, department, designation } = req.body;

    // Check if faculty already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create new faculty
    const faculty = new Faculty({
      name,
      email,
      phone,
      password_hash: password,
      department,
      designation
    });

    await faculty.save();

    res.status(201).json({
      id: faculty._id,
      name: faculty.name,
      email: faculty.email,
      role: 'Faculty',
      message: 'Registration successful. Please login.'
    });
  } catch (error) {
    console.error('Faculty registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login (works for all user types)
export const login = (userType) => async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    // Find user based on type
    let User;
    switch(userType) {
      case 'student':
        User = Student;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      success: true,
      type: 'Bearer',
      userId: user._id,
      email: user.email,
      name: user.name,
      role: userType.charAt(0).toUpperCase() + userType.slice(1)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get Profile
export const getProfile = (userType) => async (req, res) => {
  try {
    let User;
    switch(userType) {
      case 'student':
        User = Student;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
    }

    const user = await User.findById(req.user.id).select('-password_hash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Profile
export const updateProfile = (userType) => async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['phone', 'address', 'city', 'pincode'];
    
    if (userType === 'faculty') {
      allowedUpdates.push('qualification', 'experience_years');
    }

    // Filter only allowed updates
    Object.keys(updates).forEach(key => {
      if (!allowedUpdates.includes(key)) {
        delete updates[key];
      }
    });

    let User;
    switch(userType) {
      case 'student':
        User = Student;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password_hash');

    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    // Find user based on role
    let User;
    switch(req.user.role) {
      case 'Student':
        User = Student;
        break;
      case 'Faculty':
        User = Faculty;
        break;
      case 'Admin':
        User = Admin;
        break;
      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password_hash = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email (check all user types)
    let user = await Student.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await Faculty.findOne({ email: email.toLowerCase() });
    }
    if (!user) {
      user = await Admin.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      // Don't reveal if email exists for security
      return res.status(200).json({ message: 'If email exists, OTP will be sent' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Delete existing OTPs for this email
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Create new OTP record with 10-minute expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt,
    });

    // Send OTP via email
    const subject = 'Your Password Reset OTP';
    const html = `
      <h2>Password Reset Request</h2>
      <p>Your OTP for password reset is:</p>
      <h3 style="font-size: 32px; font-weight: bold; color: #3B82F6; letter-spacing: 5px;">${otp}</h3>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await sendMail({
      to: email,
      subject,
      html,
      text: `Your OTP for password reset is: ${otp}. This will expire in 10 minutes.`,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find and validate OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      expiresAt: { $gt: new Date() }, // OTP not expired
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password with OTP
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    // Find and validate OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      expiresAt: { $gt: new Date() }, // OTP not expired
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Find user by email
    let user = await Student.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await Faculty.findOne({ email: email.toLowerCase() });
    }
    if (!user) {
      user = await Admin.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    user.password_hash = newPassword;
    await user.save();

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({ message: 'Password reset successfully. Please login.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Generic User Registration - Works for Student, Faculty, Admin
export const UserRegister = async (req, res) => {
  try {
    const { name, email, phone, password, role, ...otherData } = req.body;
    console.log({ name, email, phone, password, role, ...otherData });
    

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, phone, password, and role are required' 
      });
    }

    let User;
    const roleData = { name, email, phone, password_hash: password, ...otherData };

    switch(role.toLowerCase()) {
      case 'student':
        User = Student;
        roleData.semester = 1;
        const studentCount = await Student.countDocuments();
        roleData.roll_number = `STD${Date.now()}${studentCount + 1}`;
        break;
      case 'faculty':
        User = Faculty;
        break;
      case 'admin':
        User = Admin;
        break;
      default:
        return res.status(400).json({ 
          success: false,
          message: 'Invalid role. Choose from: student, faculty, admin' 
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    const user = new User(roleData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please login.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

// Generic User Login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    let user = await Student.findOne({ email: email.toLowerCase() });
    let role = 'Student';

    if (!user) {
      user = await Faculty.findOne({ email: email.toLowerCase() });
      role = 'Faculty';
    }

    if (!user) {
      user = await Admin.findOne({ email: email.toLowerCase() });
      role = 'Admin';
    }

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const token = generateToken({ ...user.toObject(), role });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        tokenType: 'Bearer',
        userId: user._id,
        email: user.email,
        name: user.name,
        role: role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// User Logout
export const UserLogout = async (req, res) => {
  try {
    // For JWT-based auth, logout is handled on client side
    // This endpoint can be used for additional cleanup if needed
    res.status(200).json({
      success: true,
      message: 'Logout successful. Please discard the token on client side.'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error during logout',
      error: error.message 
    });
  }
};

// Generate OTP for password reset
export const UserGenOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is required' 
      });
    }

    // Find user by email (check all user types)
    let user = await Student.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await Faculty.findOne({ email: email.toLowerCase() });
    }
    if (!user) {
      user = await Admin.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      // Security: Don't reveal if email exists
      return res.status(200).json({ 
        success: true,
        message: 'If email exists, OTP will be sent' 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete existing OTPs for this email
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Create new OTP record with 10-minute expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt,
    });

    // Send OTP via email
    const subject = 'Your Password Reset OTP';
    const html = `
      <h2>Password Reset Request</h2>
      <p>Your OTP for password reset is:</p>
      <h3 style="font-size: 32px; font-weight: bold; color: #3B82F6; letter-spacing: 5px;">${otp}</h3>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

  
    await sendMail({
      email,
      subject,
      html
    });

    res.status(200).json({ 
      success: true,
      message: 'OTP sent to your email' 
    });
  } catch (error) {
    console.error('Generate OTP error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error generating OTP',
      error: error.message 
    });
  }
};

// Verify OTP
export const UserVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and OTP are required' 
      });
    }

    // Find and validate OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      expiresAt: { $gt: new Date() }, // OTP not expired
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired OTP' 
      });
    }

    // Generate a temporary token for password reset
    const resetToken = generateToken({ email: email.toLowerCase(), purpose: 'password-reset' });

    res.status(200).json({ 
      success: true,
      message: 'OTP verified successfully',
      data: {
        resetToken,
        tokenType: 'Bearer'
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error verifying OTP',
      error: error.message 
    });
  }
};

// Forget/Reset Password with OTP
export const UserForgetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Email, OTP, and new password are required' 
      });
    }

    // Find and validate OTP
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp,
      expiresAt: { $gt: new Date() }, // OTP not expired
    });

    if (!otpRecord) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired OTP' 
      });
    }

    // Find user by email
    let user = await Student.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = await Faculty.findOne({ email: email.toLowerCase() });
    }
    if (!user) {
      user = await Admin.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Update password
    user.password_hash = newPassword;
    await user.save();

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ 
      success: true,
      message: 'Password reset successfully. Please login.' 
    });
  } catch (error) {
    console.error('Forget password error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error resetting password',
      error: error.message 
    });
  }
};