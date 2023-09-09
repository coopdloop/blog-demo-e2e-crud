import { jwtVerify } from "jose";

interface UserJWTPayload {
  jti: string;
  iat: number;
}

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error("The JWT_SECRET_KEY environment variable must be set.");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );
    return verified.payload as UserJWTPayload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
