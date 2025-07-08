'use strict';
/** @type {import('sequelize-cli').Migration} */
const { SEAT_TYPES } = require('../utils/common/enum');
const { BUSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY } = SEAT_TYPES;
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airplane_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM(BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS),
        allowNull: false,
        defaultValue: FIRST_CLASS
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
    // ✅ Clean up ENUM type to avoid migration errors (PostgreSQL-specific)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Seats_type";');
  }
};
