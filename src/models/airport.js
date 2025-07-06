'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: 'cityId'
      });
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'DepartureFlights',
        onDelete: 'CASCADE'
      });
      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        as: 'ArrivalFlights',
        onDelete: 'CASCADE'
      });

    }
  }

  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER, // ✅ Must match Cities.id
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};
