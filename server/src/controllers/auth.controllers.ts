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
import {
  resetPasswordEmailTemplate,
  signUpEmailTemplate,
} from "../lib/email/templates";

export const signUp: Handler = async (req, res, next) => {
  try {
    const { success, data, error } = signUpSchema.safeParse(req.body);
    if (!success) {
      throw createError(400, error.issues[0].message);
    }
    const existingUser = await UserModel.findOne({ email: data.email });
    console.log(existingUser);
    if (existingUser) throw createError(403, "Email already signed up!");
    const passwordHash = await bcrypt.hash(data.password, 10);
    data.password = "";
    const user = await UserModel.create({
      ...data,
      passwordHash,
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
    res.status(200).json("Signed out!");
  } catch (e) {
    next(e);
  }
};

export const getAuthUser: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findById((req as any).userId);

    if (!user) throw createError(404, "User not found!");

    user.passwordHash = "";
    user.emailVerification.code = "";
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const verifyEmail: Handler = async (req, res, next) => {
  try {
    const { code } = req.body;
    const user = await UserModel.findById((req as any).userId);

    if (!user) throw createError(404, "User not found!");
    if (user.emailVerification.done)
      throw createError(403, "Email already verified!");
    if (user.emailVerification.code !== code)
      throw createError(403, "Incorrect code!");

    user.emailVerification.done = true;
    user.emailVerification.code = "";
    await user.save();

    res.status(200).json("Email verified!");
  } catch (e) {
    next(e);
  }
};
export const resendVerificationEmail: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findById((req as any).userId);

    if (!user) throw createError(404, "User not found!");
    if (user.emailVerification.done)
      throw createError(403, "Email already verified!");

    user.emailVerification.code = generateCode();
    await user.save();

    await sendMail({
      to: user.email,
      html: signUpEmailTemplate
        .replace("{{name}}", user.firstName + " " + user.lastName)
        .replace("{{code}}", user.emailVerification.code),
    });

    res.status(200).json("Email sent!");
  } catch (e) {
    next(e);
  }
};
export const resetPassword: Handler = async (req, res, next) => {
  try {
    const { code, password } = req.body;
    const user = await UserModel.findOne({ email: req.query.email });

    if (!user) throw createError(404, "User not found!");
    if (user.resetPasswordCode !== code)
      throw createError(403, "Incorrect code!");
    if (!password || typeof password !== "string" || password.length < 8)
      throw createError(403, "Password must be at least 8 characters long!");
    const passwordHash = await bcrypt.hash(password, 10);
    user.passwordHash = passwordHash;
    user.resetPasswordCode = "";

    await user.save();

    res.status(200).json("Password reset!");
  } catch (e) {
    next(e);
  }
};
export const resendPasswordEmail: Handler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.query.email });

    if (!user) throw createError(404, "User not found!");

    user.resetPasswordCode = generateCode();
    await user.save();

    await sendMail({
      to: user.email,
      html: resetPasswordEmailTemplate
        .replace("{{name}}", user.firstName + " " + user.lastName)
        .replace("{{code}}", user.resetPasswordCode),
    });

    res.status(200).json("Email sent!");
  } catch (e) {
    next(e);
  }
};
