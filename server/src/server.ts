import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/mongodb";
import { PORT } from "./config/env";
import authRouter from "./routes/auth.routes";
import usersRouter from "./routes/users.routes";
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("hello");
  next();
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use(
  ((): ErrorRequestHandler => (err, req, res, next) => {
    console.log(err);

    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ message });
  })()
);

const start = () => {
  app.listen(PORT, () => {
    console.log(`\x1b[32mServer running on port ${PORT}\x1b[0m`);
  });
};

connectDb()
  .then(() => {
    start();
  })
  .catch((e) => console.log(e));
