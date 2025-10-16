import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/mongodb";
import { PORT } from "./config/env";
import { createError } from "./lib/utils";
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use(
  ((): ErrorRequestHandler => (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ message });
  })()
);

app.listen(PORT, () => {
  connectDb().then(() => {
    console.log(`Server running on port ${PORT}`);
  });
});
