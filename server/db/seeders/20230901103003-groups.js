'use strict';
const { Group } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        teacher_id: 1,
        title: '11 класс',
      },
      {
        teacher_id: 2,
        title: '7 класс',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Group.destroy({ where: {} });
  },
};
