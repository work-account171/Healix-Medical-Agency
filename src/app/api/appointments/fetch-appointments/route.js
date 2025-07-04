import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect();
        const appointments = Appointment.find({}).populate('doctor').lean();

        return NextResponse.json({ success: true, appointments }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}