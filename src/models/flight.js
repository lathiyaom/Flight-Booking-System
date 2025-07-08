'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {

    static associate(models) {

      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
      })
      this.belongsTo(models.Airplane, {
        foreignKey: 'departureAirportId',
        as: "departure_Airport"
      })
      this.belongsTo(models.Airplane, {
        foreignKey: 'arrivalAirportId',
        as: "arrival_Airport"
      })
    }
  }
  Flight.init({
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false

    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false

    },
    arrivalTime:
    {
      type: DataTypes.DATE,
      allowNull: false

    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    boardingGate: {
      type: DataTypes.STRING
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false

    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};