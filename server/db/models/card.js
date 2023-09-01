'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
   
    static associate({Answer, Module}) {
      this.hasMany(Answer, { foreignKey: 'card_id' });
      this.belongsTo(Module, { foreignKey: 'module_id' });
    }
  }
  Card.init({
    term: {
      type: DataTypes.TEXT
    },
    definition: {
      type: DataTypes.TEXT
    },
    img: {
      type: DataTypes.TEXT
    },
    audio: {
      type: DataTypes.TEXT
    },
    module_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Modules',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};