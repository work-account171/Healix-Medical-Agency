import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      role,
      phone,
      location,
      specialization,
      experienceYears,
      consultationFee,
    } = body;
    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (!["doctor", "patient"].includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create User
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    if (role === "doctor") {
      if (!specialization || !experienceYears || !location) {
        return new Response(
          JSON.stringify({ error: "Doctor-specific fields are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      await Doctor.create({
        user_id: newUser._id,
        name,
        specialization,
        experienceYears,
        consultationFee: consultationFee || 100,
        location,
        profileImage: "",
        verified: false,
        appointments: [],
      });
    } else if (role === "patient") {
      if (!phone || !location) {
        return new Response(
          JSON.stringify({ error: "Patient-specific fields are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      await Patient.create({
        user_id: newUser._id,
        name,
        email,
        phone,
        location,
        appointments: [],
      });
    }
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
