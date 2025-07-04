import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import mongoose from "mongoose";
import Doctor from "@/models/Doctor";

export async function GET() {
    try {
        await dbConnect();

        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await verifyJwt(token);
        const userId = new mongoose.Types.ObjectId(user.userId);

        const doctor = await Doctor.findOne({ user_id: userId })
        const doctorId = doctor._id;

        const appointments = await Appointment.find({ doctor: doctorId })
            .populate("doctor")
            .lean();


        return NextResponse.json({ success: true, appointments }, { status: 200 });
    } catch (error) {
        console.error("Appointments fetch error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
