import { signJwt } from "@/lib/jwt";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  const { email, password } = await req.json();

  await dbConnect();
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Create JWT payload
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = await signJwt(payload, "2h");

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 2,
    path: "/",
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
