import User from "./User.js";
import Project from "./Project.js";

User.hasMany(Project, {
  foreignKey: "fk_project_user_id",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "fk_project_user_id",
});

export default { User, Project };
