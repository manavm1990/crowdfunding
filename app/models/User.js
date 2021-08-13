import bcrypt from "bcrypt";
import pkg from "sequelize";

// An instance of Sequelize that has been loaded
import sequelize from "../loaders/sequelize.js";

const { DataTypes, Model } = pkg;

class User extends Model {
  // Instance method
  checkPassword(pass) {
    return bcrypt.compare(pass, this.password);
  }
}

// This creates a new instance of a User
// It's as if we did `new User` ourselves
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // defaults to length of 255
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),

      is:
        // matches this RegExp
        /^[0-9a-f]{64}$/i,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        newUser.isVerified = false;
        return newUser;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "user",
  }
);

export default User;
