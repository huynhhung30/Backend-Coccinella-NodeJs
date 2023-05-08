module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        password: "123123",
        firstName: "Huynh",
        lastName: "Beo",
        codeName:"de_beo",
        email: "Beo@example.com",
        address: "No need",
        userType: "admin",
        phone: "0932784774",
        gender: 1,
        introduce: "Wazzup",
        avatar: null,
        backgroundPhoto: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
