'use strict';
const { Category } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Category.bulkCreate([
      {
        title: 'Языки',
        
      },
      {
        title: 'Математика',
      },
      {
        title: 'Программирование',
        
      },
      {
        title: 'Наука',
      },
      {
        title: 'Культура и искусство',
        
      },
      {
        title: 'Социальные науки',
      },
      {
        title: 'Экзамены',
        
      },
      {
        title: 'Другое',
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Category.destroy({ where: {} });
  }
};
