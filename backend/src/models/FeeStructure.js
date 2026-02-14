import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
  branch: { 
    type: String, 
    enum: ['CSE', 'ECE', 'ME', 'CE', 'EE'],
    required: true 
  },
  semester: { type: Number, required: true, min: 1, max: 8 },
  tuition_fee: { type: Number, required: true },
  hostel_fee: { type: Number, default: 0 },
  library_fee: { type: Number, required: true },
  lab_fee: { type: Number, required: true },
  total_fee: { type: Number, required: true },
  due_date: { type: Date, required: true }
}, { timestamps: true });

// Calculate total fee before saving
feeStructureSchema.pre('save', function(next) {
  this.total_fee = this.tuition_fee + this.hostel_fee + this.library_fee + this.lab_fee;
  next();
});

export default mongoose.model('FeeStructure', feeStructureSchema);