import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = new Router();

router.get(
  "/verify/:verification",
  async ({ params: { verification } }, res) => {
    try {
      if (UserController.verify(verification)) {
        res.status(200).json({ message: "✅" });
      } else {
        res
          .status(400)
          .json({ message: "Invalid ✉️ verification. Contact support 👱🏾‍♂️" });
      }
    } catch (err) {
      if (err) {
        res.status(400).json({ message: err.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/", async ({ body }, res) => {
  try {
    // User.create is similar to doing new User
    const user = await UserController.create(body);
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
