import { Sequelize } from "sequelize";
import config from "../config/index.js";

const {
  db: { name, user, password },
} = config;

export default new Sequelize(name, user, password, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
