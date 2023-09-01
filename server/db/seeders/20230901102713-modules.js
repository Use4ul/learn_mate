'use strict';
const { Module } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Module.bulkCreate([
      {
        title: 'Английский язык',
        user_id: 1,
        category_id:1,
      },
      {
        title: 'Языки программирования',
        user_id: 2,
        category_id:3,
      },
      {
        title: 'Примеры',
        user_id: 3,
        category_id:2,
      },
      {
        title: 'Химия}',
        user_id: 4,
        category_id:4
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Module.destroy({ where: {} });
  }
};
