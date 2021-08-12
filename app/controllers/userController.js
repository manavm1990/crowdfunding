import User from "../models/User.js";

class UserController {
  static async login(email, password) {
    const existingUser = await User.findOne({ where: { email } });

    const validated = await existingUser?.checkPassword(password);

    if (validated) {
      const { id, password, ...user } = existingUser.dataValues;
      return user;
    }

    throw new Error("❗ Access Denied");
  }
}

export default UserController;
