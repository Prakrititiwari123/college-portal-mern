import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Password validation function
const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
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
