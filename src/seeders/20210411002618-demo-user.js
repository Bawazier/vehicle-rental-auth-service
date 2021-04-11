"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        rolesId: 1,
        name: "Super User",
        email: "super_user@email.com",
        password: await bcrypt.hash(
          "12345678",
          Number(process.env.SALT_ROUND || 10)
        ),
        phone: "082312452677",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
