'use strict';
const { User } = require('../models');
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: 'Katya',
        nickname: "katya",
        email: 'Katya_ne@mail.ru',
        password: await bcrypt.hash('123456', 5),
        role_id: 1
      },
      {
        name: 'Roma',
        nickname: "roma",
        email: 'Rma_ne@mail.ru',
        password: await bcrypt.hash('123456', 5),
        role_id: 1
      },
      {
        name: 'Valeron',
        nickname: "valeron",
        email: 'Valeron@mail.ru',
        password: await bcrypt.hash('123456', 5),
        role_id: 2
      },
      {
        name: 'Rustam',
        nickname: "rustam_rustut",
        email: 'Rustam@mail.ru',
        password: await bcrypt.hash('123456', 5),
        role_id: 2
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await User.destroy({ where: {} });
  }
};
