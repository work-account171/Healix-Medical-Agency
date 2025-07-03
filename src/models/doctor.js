import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  experienceYears: { type: Number, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
