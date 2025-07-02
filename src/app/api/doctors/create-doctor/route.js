import { NextResponse } from "next/server";
import Doctor from "@/doctor-models/doctor";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newDoctor = await Doctor.create({
      name: body.name,
      verified: body.verified || false,
      profileImage: body.profileImage || "",
      specialization: body.specialization,
      experienceYears: body.experienceYears,
      availableDays: body.availableDays || [],
      availableTime: body.availableTime || {},
    });

    return NextResponse.json({ success: true, doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
