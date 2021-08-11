import sequelize from "../../loaders/sequelize.js";
import models from "../../models/index.js";
import * as userData from "./userData.json";
import * as projectData from "./projectData.json";

(async () => {
  await sequelize.sync({ force: true });

  const users = await models.User.bulkCreate(userData.default, {
    individualHooks: true,
  });

  await Promise.all(
    projectData.default.map(async (project) => {
      await models.Project.create({
        ...project,
        neededFunding: project.needed_funding,
        userId: users[Math.floor(Math.random() * users.length)].id,
      });
    })
  );

  process.exit(0);
})();
