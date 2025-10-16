import { Handler } from "express";
import { createError } from "../lib/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config/env";

export const authMiddleware: Handler = async function (req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) throw createError(401, "Unauthorized!");

    const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET!) as JwtPayload;

    if (!payload) throw createError(401, "Unauthorized!");

    (req as any).userId = payload.id;
    next();
  } catch (e) {
    next(e);
  }
};
