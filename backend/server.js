import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth/authRoutes.js';
import adminRoutes from './src/routes/admin/adminRoutes.js';
import facultyRoutes from './src/routes/faculty/facultyRoutes.js';
import studentRoutes from './src/routes/student/studentRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://collegefrontendpro.netlify.app', // Adjust as needed for production
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
