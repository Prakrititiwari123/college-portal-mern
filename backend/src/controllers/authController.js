import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { sendMail } from '../utils/mailer.js';

// Password validation function
const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Generate JWT Token (includes userId, email, role)
const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
};

// Student Registration
export const registerStudent = async (req, res) => {
    try {
        const { name, email, phone, password, branch, enrollment_year } = req.body;

        // Validation
        if (!name || !email || !phone || !password || !branch || !enrollment_year) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            role: 'STUDENT',
            branch,
            enrollment_year,
        });

        await newUser.save();

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            message: 'Registration successful. Please login.',
        });
    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Faculty Registration
export const registerFaculty = async (req, res) => {
    try {
        const { name, email, phone, password, department, designation } = req.body;

        // Validation
        if (!name || !email || !phone || !password || !department || !designation) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            role: 'FACULTY',
            department,
            designation,
        });

        await newUser.save();

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            message: 'Registration successful. Please login.',
        });
    } catch (error) {
        console.error('Faculty registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Admin Registration (SuperAdmin only)
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, phone, password, adminKey } = req.body;

        // Admin key validation (for security)
        const ADMIN_KEY = process.env.ADMIN_KEY || 'admin-secret-key';
        if (adminKey !== ADMIN_KEY) {
            return res.status(401).json({ message: 'Invalid admin key. Not authorized to register admin.' });
        }

        // Validation
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character',
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
            role: 'ADMIN',
            is_superadmin: true,
        });

        await newUser.save();

        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            message: 'Admin registration successful. Please login.',
        });
    } catch (error) {
        console.error('Admin registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Student Login
export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase(), role: 'STUDENT' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            token,
            type: 'Bearer',
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        console.error('Student login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Faculty Login
export const loginFaculty = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase(), role: 'FACULTY' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            token,
            type: 'Bearer',
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        console.error('Faculty login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase(), role: 'ADMIN' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            token,
            type: 'Bearer',
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Forgot Password - generate token, store and send email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const user = await User.findOne({ email: email.toLowerCase() });
        // Always respond with success message to avoid leaking user existence
        if (!user) {
            return res.status(200).json({ message: 'Reset link sent to email' });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

        // Save token
        await PasswordResetToken.create({ userId: user._id, token, expiresAt });

        // Send email (link to frontend reset page or backend endpoint)
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
        const subject = 'Password reset request';
        const text = `You requested a password reset. Use the link below to reset your password (valid for 1 hour):\n\n${resetLink}`;

        await sendMail({ to: user.email, subject, text });

        return res.status(200).json({ message: 'Reset link sent to email' });
    } catch (err) {
        console.error('Forgot password error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password using token
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ message: 'Token and newPassword are required' });

        const tokenDoc = await PasswordResetToken.findOne({ token });
        if (!tokenDoc) return res.status(400).json({ message: 'Invalid or expired token' });
        if (tokenDoc.expiresAt < new Date()) {
            await PasswordResetToken.deleteOne({ _id: tokenDoc._id });
            return res.status(400).json({ message: 'Token expired' });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character' });
        }

        const user = await User.findById(tokenDoc.userId);
        if (!user) return res.status(400).json({ message: 'User not found' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        // consume token
        await PasswordResetToken.deleteOne({ _id: tokenDoc._id });

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Reset password error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Change password - authenticated
export const changePassword = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { oldPassword, newPassword } = req.body;

        if (!userId) return res.status(401).json({ message: 'Not authenticated' });
        if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Old and new password required' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Old password incorrect' });

        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
