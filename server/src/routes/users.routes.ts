import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  acceptConnectionRequest,
  editProfile,
  getUser,
  sendConnectionRequest,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.patch("/", editProfile);
usersRouter.get("/:uid", getUser);
usersRouter.post("/:uid/connection/send", sendConnectionRequest);
usersRouter.post("/:connectionId/connection/accept", acceptConnectionRequest);

export default usersRouter;
