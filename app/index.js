import express from "express";
import config from "./config/index.js";
import sequelize from "./loaders/sequelize.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());

// http://localhost:3001/users
app.use("/users", usersRouter);

sequelize
  .sync({ force: true })
  .then(app.listen(config.port, () => console.info("Now listening")));
