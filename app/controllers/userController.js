import config from "../config/index.js";
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
      const {
        dataValues: { verification },
      } = await models.Verification.create({
        email,
      });
      const verificationLink = `http://localhost:${
        config.port
      }/users/verify/${encodeURIComponent(verification)}`;

      ms.sendVerificationEmail(email, verificationLink);
      return UserController._stripUser(user);
    }

    throw new Error("Unable to create user!");
  }

  static async login(email, password) {
    // `existingUser` will be an instance of User
    const existingUser = await models.User.findOne({ where: { email } });

    const validated = await existingUser?.checkPassword(password);

    if (validated) {
      return UserController._stripUser(existingUser);
    }

    throw new Error("❗ Access Denied");
  }

  static async verify(verification) {
    // Find the user's ✉️ via the hashed url
    const { email } = await models.Verification.findOne({
      where: {
        verification,
      },
    });

    if (email) {
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        await user.update({
          isVerified: true,
        });

        // TODO: Actually verify that this was destroyed and act accordingly
        models.Verification.destroy({
          where: {
            email,
          },
        });

        return true;
      }

      throw new Error("Invalid user!");
    }

    return false;
  }
}

export default UserController;
