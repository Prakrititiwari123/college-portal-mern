import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subject_code: { type: String, required: true, unique: true },
  subject_name: { type: String, required: true },
  branch: { 
    type: String, 
    enum: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
    required: true 
  },
  semester: { type: Number, required: true, min: 1, max: 8 },
  credits: { type: Number, required: true },
  theory_marks: { type: Number, default: 100 },
  practical_marks: { type: Number, default: 50 }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);