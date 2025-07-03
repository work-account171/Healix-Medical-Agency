import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET() {
    const token = cookies().get("token")?.value;

    if (!token) return new Response("Unauthorized", { status: 401 });

    try {
        const user = await verifyJwt(token);
        return Response.json({ user });
    } catch {
        return new Response("Invalid token", { status: 403 });
    }
}
