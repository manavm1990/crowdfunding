/* This is the only place that accesses `dotenv` */
import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  email: process.env.EMAIL,
  port: process.env.PORT || 3001,
  secret: process.env.SECRET || "secret",
};
