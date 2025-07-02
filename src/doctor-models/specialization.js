import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  }
});

export default mongoose.models.Specialization || mongoose.model("Specialization", specializationSchema);