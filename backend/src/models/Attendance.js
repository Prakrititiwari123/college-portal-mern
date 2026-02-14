import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true 
  },
  course_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  class_date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['PRESENT', 'ABSENT', 'LEAVE'],
    required: true 
  },
  marked_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Faculty',
    required: true 
  }
}, { timestamps: true });

// Ensure one attendance record per student per course per day
attendanceSchema.index({ student_id: 1, course_id: 1, class_date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);