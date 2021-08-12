import User from "../models/User.js";

class UserController {
  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("❗ Access Denied");
    }

    return user;
  }
}

export default UserController;
