"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      codeName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      userType: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      introduce: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.BOOLEAN,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      backgroundPhoto: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
