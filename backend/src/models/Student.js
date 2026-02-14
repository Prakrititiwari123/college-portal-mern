import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    roll_number: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password_hash: { type: String, required: true },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "ECE", "ME", "CE", "EE"],
    },
    semester: { type: Number, min: 1, max: 8 },
    enrollment_year: { type: Number, required: true },
    dob: Date,
    address: String,
    city: String,
    pincode: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Hash password before saving
studentSchema.pre("save", async function () {
  if (!this.isModified("password_hash")) {
    return;
  }
  this.password_hash = await bcrypt.hash(this.password_hash, 10);
});

// Compare password method
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};

export default mongoose.model("Student", studentSchema);
