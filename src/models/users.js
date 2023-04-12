"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      codeName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      userType: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      introduce: DataTypes.STRING,
      avatar: DataTypes.STRING,
      backgroundPhoto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return Users;
};
