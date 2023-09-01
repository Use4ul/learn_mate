'use strict';
const { Answer } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Answer.bulkCreate([
      {
        user_id: 3,
        card_id:1,
        isCorrect: true ,
      },
      {
        user_id: 3,
        card_id:2,
        isCorrect: true,
      },
      {
        user_id: 4,
        card_id:3,
        isCorrect: false,
      },
      {
        user_id: 4,
        card_id:4,
        isCorrect: false,
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Answer.destroy({ where: {} });
  }
};
