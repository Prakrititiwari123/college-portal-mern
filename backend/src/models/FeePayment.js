import mongoose from 'mongoose';

const feePaymentSchema = new mongoose.Schema({
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: true 
  },
  fee_structure_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FeeStructure',
    required: true 
  },
  amount_paid: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  transaction_id: { type: String, required: true, unique: true },
  payment_status: { 
    type: String, 
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  receipt_number: { type: String, unique: true }
}, { timestamps: true });

// Generate receipt number before saving
feePaymentSchema.pre('save', async function(next) {
  if (!this.receipt_number) {
    const date = new Date();
    const year = date.getFullYear();
    const count = await mongoose.model('FeePayment').countDocuments();
    this.receipt_number = `RCPT/${year}/${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('FeePayment', feePaymentSchema);