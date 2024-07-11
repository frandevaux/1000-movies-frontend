import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export const authRequired = async (next: () => void) => {
  const cookiesHeader = cookies();
  const token = cookiesHeader.get("token");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET || "");

    next();
  } catch (err) {
    return new Response("Invalid token", { status: 403 });
  }
};
