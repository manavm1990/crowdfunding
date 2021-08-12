import { Router } from "express";
import User from "../models/User.js";

const router = new Router();

router.post("/", async ({ body }, res) => {
  try {
    const user = await User.create(body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Unable to create user" });
  }
});

export default router;
