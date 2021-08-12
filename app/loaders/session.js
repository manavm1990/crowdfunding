import connectSessionSequelize from "connect-session-sequelize";
import session from "express-session";
import config from "../config/index.js";
import sequelize from "./sequelize.js";

const SequelizeStore = connectSessionSequelize(session.Store);

sequelize.sync({ force: true });

export default session({
  secret: config.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
});
