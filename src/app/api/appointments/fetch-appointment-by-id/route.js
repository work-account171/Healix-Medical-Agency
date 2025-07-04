import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function GET() {
    try {
        await dbConnect();

        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await verifyJwt(token);
        const userId = user.userId;

        const appointments = await Appointment.find({ user_id: userId })
            .populate("doctor")
            .lean();

        return NextResponse.json({ success: true, appointments }, { status: 200 });
    } catch (error) {
        console.error("Appointments fetch error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
