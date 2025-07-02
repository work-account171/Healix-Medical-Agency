import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/doctor-models/doctor";

export async function GET() {
  try {
    await dbConnect();
    const doctors = await Doctor.find({})
    .populate("specialization")
    .lean();

    return NextResponse.json(
      { success: true, doctors },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
