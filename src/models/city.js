'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      this.hasMany(models.Airport, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }

  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'City',
  });

  return City;
};
