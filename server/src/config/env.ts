import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  "mwrjksf hvuijkwedavjidkmvs wenvdisjcnknqiecm  ;ED";
export const NODE_ENV = process.env.NODE_ENV;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
