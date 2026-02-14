import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password_hash: { type: String, required: true },
  designation: { 
    type: String, 
    enum: ['Professor', 'Associate Professor', 'Assistant Professor'],
    required: true 
  },
  department: { 
    type: String, 
    enum: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
    required: true 
  },
  qualification: String,
  experience_years: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

facultySchema.pre('save', async function() {
  if (!this.isModified('password_hash')) {
    return;
  }
  this.password_hash = await bcrypt.hash(this.password_hash, 10);
});

facultySchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

export default mongoose.model('Faculty', facultySchema);