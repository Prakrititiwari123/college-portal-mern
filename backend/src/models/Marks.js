import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
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
  theory_marks: { type: Number, default: 0 },
  practical_marks: { type: Number, default: 0 },
  total_marks: { type: Number, default: 0 },
  grade: { 
    type: String, 
    enum: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'] 
  },
  semester: { type: Number, required: true },
  academic_year: { type: String, required: true }
}, { timestamps: true });

// Calculate total marks before saving
marksSchema.pre('save', function(next) {
  this.total_marks = (this.theory_marks || 0) + (this.practical_marks || 0);
  
  // Calculate grade based on total marks
  const percentage = (this.total_marks / (100 + 50)) * 100;
  if (percentage >= 90) this.grade = 'A+';
  else if (percentage >= 80) this.grade = 'A';
  else if (percentage >= 70) this.grade = 'B+';
  else if (percentage >= 60) this.grade = 'B';
  else if (percentage >= 50) this.grade = 'C';
  else if (percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

export default mongoose.model('Marks', marksSchema);