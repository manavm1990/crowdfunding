import { Sequelize } from "sequelize";
import config from "../config/index.js";

export default new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASSWORD,
  config.db.CONN_PARAMS
);
