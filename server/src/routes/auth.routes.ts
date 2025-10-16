import { Router } from "express";
import {
  getAuthUser,
  resendPasswordEmail,
  resendVerificationEmail,
  resetPassword,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.delete("/sign-out", signOut);
authRouter.get("/user", authMiddleware, getAuthUser);
authRouter.post("/verify-email", authMiddleware, verifyEmail);
authRouter.get(
  "/resend-verification-email",
  authMiddleware,
  resendVerificationEmail
);
authRouter.get("/resend-password-email", resendPasswordEmail);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
