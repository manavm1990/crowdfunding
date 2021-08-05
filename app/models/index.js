import User from "./User.js";
import Project from "./Project.js";

User.hasMany(Project, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "user_id",
});

export default { User, Project };
