/* This is the only place that accesses `dotenv` */
import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    CONN_PARAMS: {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    },
  },
  PORT: process.env.PORT || 3001,
};
