'use strict';
const { Task } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Task.bulkCreate([
      {
        group_id: 1,
        module_id: 3,
      },
      {
        group_id: 2,
        module_id: 2,
      },
    
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Task.destroy({ where: {} });
  }
};
