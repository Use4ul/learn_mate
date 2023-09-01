'use strict';
const { Card } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Card.bulkCreate([
      {
        term: 'Карточка',
        definition: "Card",
        module_id: 1,
      },
      {
        term: 'Финал',
        definition: "final",
        module_id: 1,
      }, {
        term: 'Рука',
        definition: "hand",
       
        module_id: 1,
      }, {
        term: 'Голова',
        definition: "head",
        
        module_id: 1,
      },
      {
  
        definition: "TypeScript",
        img:"https://webkab.ru/wp-content/uploads/2023/02/ts.jpg",
        module_id: 2,
      },
      {
        definition: "JavaScript",
        img:"https://stepik.org/media/cache/images/courses/53182/cover/a93310c48b314953e6a78ee00a770ee5.webp",
        module_id: 2,
      },
      {
        definition: "Python",
        img:"https://media.proglib.io/tests/2020/07/13/0490ca317f30110e54bbe0de45694ae7.png",
        module_id: 2,
      },
      
      {
        term: '2+2=',
        definition: "4",
        module_id: 3,
      },
      {
        term: '5+3=',
        definition: "8",
        module_id: 3,
      },
      {
        term: '7+4=',
        definition: "11",
        module_id: 3,
      },
      {
        term: '12+1=',
        definition: "13",
        module_id: 3,
      },

      {
        term: 'N',
        definition: "Азот",
        module_id: 4,
      },
      {
        term: 'Fe',
        definition: "железо",
        module_id: 4,
      },
      {
        term: 'K',
        definition: "калий",
        module_id: 4,
      },
      {
        term: 'Ca',
        definition: "Кальций",
        module_id: 4,
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Card.destroy({ where: {} });
  }
};
