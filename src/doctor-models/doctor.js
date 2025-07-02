import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: ""
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization',
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0,
  },
  availableDays: {
    type: [String],
    default: [],
  },
  availableTime: {
    start: String,
    end: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);