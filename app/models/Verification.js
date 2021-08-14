import pkg from "sequelize";

const { DataTypes, Model } = pkg;

class Verification extends Model {}

Verification.init({
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
});
