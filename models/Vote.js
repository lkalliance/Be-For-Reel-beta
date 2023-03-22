const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "option",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allownull: true,
      validate: {
        isAlphanumeric: true,
        len: [1, 200],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "vote",
  }
);

module.exports = Vote;
