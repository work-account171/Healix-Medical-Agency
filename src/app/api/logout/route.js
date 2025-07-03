import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
    const expiredToken = serialize("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(0), // Expire the cookie immediately
        path: "/",
    });

    return new NextResponse(null, {
        status: 200,
        headers: {
            "Set-Cookie": expiredToken,
        },
    });
}
