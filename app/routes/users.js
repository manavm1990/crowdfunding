import { Router } from "express";
import models from "../models/index.js";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.post("/", async ({ body }, res) => {
  try {
    const user = await models.User.create(body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Unable to create user" });
  }
});

// http://localhost:3001/users/login
router.post("/login", async ({ body: { email, password } }, res) => {
  try {
    const user = await UserController.login(email, password);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
