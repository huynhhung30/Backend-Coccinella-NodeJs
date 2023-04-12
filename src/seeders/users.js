module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        password: "123123",
        first_name: "Huynh",
        last_name: "Beo",
        email: "Beo@example.com",
        address: "No need",
        user_type: "admin",
        phone: "0932784774",
        gender: 1,
        introduce: "Wazzup",
        avatar: null,
        background_photo: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
