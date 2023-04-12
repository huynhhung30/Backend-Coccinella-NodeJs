"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommonCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CommonCodes.init(
    {
      code: DataTypes.STRING,
      type: DataTypes.STRING,
      key: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "common_codes",
    }
  );
  return CommonCodes;
};
