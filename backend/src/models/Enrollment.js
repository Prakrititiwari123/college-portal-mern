import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true 
  },
  subject_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject',
    required: true 
  },
  course_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  semester: { type: Number, required: true },
  academic_year: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'DROPPED', 'COMPLETED'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

// Ensure unique enrollment per student per course
enrollmentSchema.index({ student_id: 1, course_id: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);