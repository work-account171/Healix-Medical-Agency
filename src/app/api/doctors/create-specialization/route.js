import { NextResponse } from "next/server";
import Specialization from "@/doctor-models/specialization";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newSpecialization = await Specialization.create({
      name: body.name || "",
      description: body.description || "",
      icon: body.icon || "",
    });

    return NextResponse.json(
      { success: true, specialization: newSpecialization },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
