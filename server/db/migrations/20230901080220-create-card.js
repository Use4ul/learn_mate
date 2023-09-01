'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      term: {
        type: Sequelize.TEXT
      },
      definition: {
        type: Sequelize.TEXT
      },
      img: {
        type: Sequelize.TEXT
      },
      audio: {
        type: Sequelize.TEXT
      },
      module_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Modules',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};