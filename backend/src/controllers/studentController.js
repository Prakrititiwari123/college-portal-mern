import User from '../models/User.js';

export const getStudentProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Not authenticated' });

        const user = await User.findById(userId).select('-password -__v');
        if (!user) return res.status(404).json({ message: 'Student not found' });

        // Only return student-specific info
        const { name, email, phone, role, branch, enrollment_year, roll_no, semester, address } = user;
        return res.status(200).json({ name, email, phone, role, branch, enrollment_year, roll_no, semester, address });
    } catch (err) {
        console.error('Get student profile error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const updateStudentProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: 'Not authenticated' });

        // Only allow certain fields to be updated
        const allowed = ['phone', 'address'];
        const updates = {};
        for (const key of allowed) {
            if (req.body[key] !== undefined) updates[key] = req.body[key];
        }

        if (Object.keys(updates).length === 0) return res.status(400).json({ message: 'No valid fields to update' });

        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password -__v');
        if (!user) return res.status(404).json({ message: 'Student not found' });

        return res.status(200).json({ message: 'Profile updated', user });
    } catch (err) {
        console.error('Update student profile error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
