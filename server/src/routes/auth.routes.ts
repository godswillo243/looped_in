import { Router } from "express";
import {
  resetPassword,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.controllers";

const authRouter = Router();

export default authRouter;

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.delete("/sign-out", signOut);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/reset-password", resetPassword);
