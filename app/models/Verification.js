import bcrypt from "bcrypt";
import pkg from "sequelize";
import sequelize from "../loaders/sequelize.js";

const { DataTypes, Model } = pkg;

class Verification extends Model {}

Verification.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    verification: {
      type: DataTypes.STRING(64),
      is:
        // matches this RegExp
        /^[0-9a-f]{64}$/i,
    },
  },
  {
    hooks: {
      // ⚠️ Don't destructure - we need to trigger a mutation in the 🪝
      beforeCreate: async (newVerification) => {
        newVerification.verification = await bcrypt.hash(
          newVerification.email,
          10
        );
        return newVerification;
      },
    },
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: "verification",
  }
);

export default Verification;
