import sequelize from "../../loaders/sequelize.js";
import models from "../../models/index.js";
import * as projectData from "./projectData.json";
import * as userData from "./userData.json";

(async () => {
  await sequelize.sync({ force: true });

  const users = await models.User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  projectData.default.forEach(async (project) => {
    await models.Project.create({
      ...project,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  });

  process.exit(0);
})();
