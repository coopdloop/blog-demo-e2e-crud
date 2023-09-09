import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJWTSecretKey } from "@/lib/auth";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("user-token")?.value || "";
    const decodedToken: any = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );
    return decodedToken.payload
  } catch (error: any) {
    throw new Error(error.message);
  }
};
