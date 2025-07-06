"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class Airplane extends Model {
    static associate(models) {
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE'
      })
    }
  }

  Airplane.init(
    {
      modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Airplane",
    }
  );

  return Airplane;
};


