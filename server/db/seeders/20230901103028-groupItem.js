'use strict';
const { GroupItem } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupItem.bulkCreate([
      {
        student_id: 3,
        group_id: 1,
      },
      {
        student_id: 4 ,
        group_id: 2,
      },
    
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await GroupItem.destroy({ where: {} });
  }
};
