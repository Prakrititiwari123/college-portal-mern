import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['STUDENT', 'FACULTY', 'ADMIN'],
        required: true,
    },
    // Student specific fields
    branch: {
        type: String,
        required: function() {
            return this.role === 'STUDENT';
        },
    },
    enrollment_year: {
        type: Number,
        required: function() {
            return this.role === 'STUDENT';
        },
    },
    // Faculty specific fields
    department: {
        type: String,
        required: function() {
            return this.role === 'FACULTY';
        },
    },
    designation: {
        type: String,
        required: function() {
            return this.role === 'FACULTY';
        },
    },
    // Admin fields
    is_superadmin: {
        type: Boolean,
        default: false,
        required: function() {
            return this.role === 'ADMIN';
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', userSchema);
