import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "@/lib/auth";
// import cookie from "cookie";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<{ error: boolean; errorMessage?: string }>> {
  try {
    const body = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(await request.json());
    const { email, password } = body;
    type payload = { user_id: number; role: string };
    let payload = {} as payload;

    // check credentials by env variables not db

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // payload for using in jwt

      payload = { user_id: 1, role: "admin" };
    }
    if (
      email === process.env.USER_EMAIL &&
      password === process.env.USER_PASSWORD
    ) {
      payload = { user_id: 2, role: "user" };
    }
    if (
      email === process.env.JDOE_EMAIL &&
      password === process.env.JDOE_PASSWORD
    ) {
      payload = { user_id: 3, role: "user" };
    }
    if (
      email === process.env.ABOB_EMAIL &&
      password === process.env.ABOB_PASSWORD
    ) {
      payload = { user_id: 4, role: "user" };
    }
    // user is logged in successfully
    // return a jwt cookie
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(new TextEncoder().encode(getJWTSecretKey()));

    cookies().set({
      name: "user-token",
      value: token,
      path: "/",
      httpOnly: true,
    });
    console.log(`User ${payload.user_id} logged in successfully`);

    return NextResponse.json({ error: false });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: true,
        errorMessage: error.issues.map((issue) => issue.message).join("\n"),
      });
    }
    console.log(error);
  }

  throw new Error("Invalid credentials");
}
