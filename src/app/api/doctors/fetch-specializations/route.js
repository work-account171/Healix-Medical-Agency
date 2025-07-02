import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Specialization from "@/doctor-models/specialization";

export async function GET() {
  try {
    await dbConnect();
    const specializations = await Specialization.find({}).lean();

    return NextResponse.json(
      { success: true, specializations },
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
