'use strict';

const { Role } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Role.bulkCreate([
      {
        title: 'Учитель',
        
      },
      {
        title: 'Ученик',
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Role.destroy({ where: {} });
  }
};
