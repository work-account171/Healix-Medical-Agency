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
    default: "",
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialization",
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
    default: 100,
  },
  availableSlots: [
    {
      date: Date,
      times: [String],
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
