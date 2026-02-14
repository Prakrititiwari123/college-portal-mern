import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password_hash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['SuperAdmin', 'Admin', 'Accountant'],
    required: true 
  }
}, { timestamps: true });

adminSchema.pre('save', async function() {
  if (!this.isModified('password_hash')) {
    return;
  }
  this.password_hash = await bcrypt.hash(this.password_hash, 10);
});

adminSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

export default mongoose.model('Admin', adminSchema);