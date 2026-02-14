import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin',
    required: true 
  },
  target_audience: { 
    type: String, 
    enum: ['STUDENT', 'FACULTY', 'ALL'],
    required: true 
  },
  expires_at: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema);