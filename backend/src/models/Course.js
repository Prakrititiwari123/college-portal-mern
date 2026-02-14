import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  faculty_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Faculty',
    required: true 
  },
  subject_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject',
    required: true 
  },
  semester: { type: Number, required: true },
  section: { type: String, required: true, enum: ['A', 'B', 'C'] },
  academic_year: { type: String, required: true },
  total_classes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);