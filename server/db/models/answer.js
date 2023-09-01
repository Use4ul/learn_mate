'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
   
    static associate({User,Card }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Card, { foreignKey: 'card_id' });
    }
  }
  Answer.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    card_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Cards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isCorrect: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};