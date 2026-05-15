import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "atonv-default-secret-change-in-production";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "admin" | "manager" | "agent" | "investor";
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice(7);
}
