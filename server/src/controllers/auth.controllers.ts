import { Handler } from "express";
import { signInSchema, signUpSchema } from "../lib/validations";
import {
  createError,
  createJWTAndSetCookie,
  generateCode,
  generateUID,
} from "../lib/utils";
import UserModel from "../db/models/user.model";
import bcrypt from "bcryptjs";
import { sendMail } from "../lib/nodemailer";
import { signUpEmailTemplate } from "../lib/email/templates";

export const signUp: Handler = async (req, res, next) => {
  try {
    const { success, data, error } = signUpSchema.safeParse(req.body);
    if (!success) {
      throw createError(400, error.issues[0].message);
    }
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) throw createError(403, "Email already signed up!");
    const user = await UserModel.create({
      ...data,
      passwordHash: await bcrypt.hash(data.password, 10),
      emailVerification: {
        done: false,
        code: generateCode(),
      },
      uid: generateUID(),
    });

    await sendMail({
      to: data.email,
      html: signUpEmailTemplate
        .replace("{{name}}", data.firstName + " " + data.lastName)
        .replace("{{code}}", user.emailVerification.code),
    });

    createJWTAndSetCookie(user.id, res);
    res.status(201).json("User created!");
  } catch (e) {
    next(e);
  }
};
export const signIn: Handler = async (req, res, next) => {
  try {
    const { success, data, error } = signInSchema.safeParse(req.body);
    if (!success) {
      throw createError(400, error.issues[0].message);
    }
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw createError(403, "Email not signed up!");
    if (!(await bcrypt.compare(data.password, user.passwordHash)))
      throw createError(403, "Incorrect password!");

    createJWTAndSetCookie(user.id, res);
    res.status(200).json("Signed in!");
  } catch (e) {
    next(e);
  }
};
export const signOut: Handler = async (req, res, next) => {
  try {
    res.cookie("accessToken", "", { maxAge: 10 });
    res.clearCookie("accessToken");
  } catch (e) {
    next(e);
  }
};
export const resetPassword: Handler = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
export const resendVerificationEmail: Handler = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
export const verifyEmail: Handler = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
export const getAuthUser: Handler = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
