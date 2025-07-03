// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJwt(payload, exp = "2h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyJwt(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
