import User from "./User.js";
import Project from "./Project.js";

User.hasMany(Project, {
  foreignKey: "fk_project_user_id",

  // Child gets deleted when parent is deleted
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "fk_project_user_id",
});

export default { User, Project };
