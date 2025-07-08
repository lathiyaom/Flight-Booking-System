'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Seats', [
      {
        airplane_id: 3,
        row: 1,
        col: 'A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 1,
        col: 'B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 1,
        col: 'C',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 1,
        col: 'D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 1,
        col: 'E',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 2,
        col: 'A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 2,
        col: 'B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 2,
        col: 'C',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 2,
        col: 'D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        airplane_id: 3,
        row: 2,
        col: 'E',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', {
      airplane_id: 3
    }, {});
  }
};
