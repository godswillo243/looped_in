import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, NODE_ENV } from "../config/env";
import { Response } from "express";

export const createError = (status?: number, message?: string) => {
  const error = new Error(message || "Something went wrong");
  (error as any).status = status || 500;
  return error;
};

export const generateCode = () =>
  Math.round(Math.random() * 1000000)
    .toString()
    .padStart(6, Math.random().toString(36));

export const generateUID = () => Math.random().toString(36).replace(".", "");

export const isDev = NODE_ENV === "development";
export const isProd = NODE_ENV === "production";

export const createJWTAndSetCookie = (id: string, res: Response) => {
  const accessToken = jwt.sign({ id }, JWT_ACCESS_SECRET!, { expiresIn: "1d" });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
    secure: isProd,
    priority: "high",
  });
};
