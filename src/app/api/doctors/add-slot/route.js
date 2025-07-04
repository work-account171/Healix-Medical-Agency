import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        const token = cookies().get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const user = await verifyJwt(token);
        const userId = user.userId;

        const body = await req.json();
        const { date, times } = body;

        if (!date || !Array.isArray(times) || times.length === 0) {
            return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
        }

        const doctor = await Doctor.findOne({ user_id: userId });

        if (!doctor) {
            return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });
        }

        // Check for duplicate date entry
        const dateObj = new Date(date);
        const existingSlot = doctor.availableSlots.find(slot => new Date(slot.date).toDateString() === dateObj.toDateString());

        if (existingSlot) {
            // Merge times without duplication
            existingSlot.times = Array.from(new Set([...existingSlot.times, ...times]));
        } else {
            // Add new slot
            doctor.availableSlots.push({ date: dateObj, times });
        }

        await doctor.save();

        return NextResponse.json({ success: true, message: "Slot added successfully", doctor }, { status: 200 });
    } catch (error) {
        console.error("Add slot error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
