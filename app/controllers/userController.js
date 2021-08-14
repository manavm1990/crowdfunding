import models from "../models/index.js";
import ms from "../services/mailerService.js";

class UserController {
  static _stripUser(user) {
    const { id, password, ...strippedUser } = user.dataValues;
    return strippedUser;
  }

  static async create(newUser) {
    const user = await models.User.create(newUser);
    if (user) {
      const { email } = user;
      const verification = await models.Verification.create({
        email,
      });
      console.log(verification);
      // ms.sendVerificationEmail(email);
      return UserController._stripUser(user);
    }

    throw new Error("Unable to create user!");
  }

  static async login(email, password) {
    // `existingUser` will be an instance of
    const existingUser = await models.User.findOne({ where: { email } });

    const validated = await existingUser?.checkPassword(password);

    if (validated) {
      return UserController._stripUser(existingUser);
    }

    throw new Error("❗ Access Denied");
  }
}

export default UserController;
