// models/seat.js

const { Model, Sequelize } = require('sequelize');
const { SEAT_TYPES } = require('../utils/common/enum');
const { BUSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY } = SEAT_TYPES;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
      });
    }
  }

  Seat.init(
    {
      row: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'airplaneId', 
      },
      type: {
        type: Sequelize.ENUM(BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS),
        allowNull: false,
        defaultValue: FIRST_CLASS,
      },
    },
    {
      sequelize,
      modelName: 'Seat',
      tableName: 'Seats',
      timestamps: true,
      underscored: true,
    }
  );

  return Seat;
};
